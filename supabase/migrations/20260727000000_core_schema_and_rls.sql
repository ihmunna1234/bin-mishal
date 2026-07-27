-- ==============================================================================
-- BIN MISAL TRAVELS - CORE DATABASE SCHEMA & RBAC AUTHORIZATION MIGRATION
-- Database: PostgreSQL 15+ / Supabase
-- Target System: Enterprise ERP & Public Web Portal (Saudi Arabia)
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 2. CUSTOM DOMAINS & ENUMS
DO $$ BEGIN
    CREATE TYPE public.app_role AS ENUM ('super_admin', 'branch_manager', 'agent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.service_category AS ENUM (
        'Umrah',
        'Flight Ticketing',
        'Passport Malumat',
        'Ziyarah Visa',
        'MISA Investor License',
        'Qiwa/Amel Issues',
        'Cargo'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE public.inquiry_status AS ENUM (
        'New',
        'Processing',
        'Action Required',
        'Completed',
        'Cancelled'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. SEQUENCES
CREATE SEQUENCE IF NOT EXISTS public.inquiry_tracking_seq
    START WITH 100001
    INCREMENT BY 1
    MINVALUE 100000
    MAXVALUE 999999
    CYCLE;

-- 4. TABLES DEFINITION

-- 4.1 Branches Table
CREATE TABLE IF NOT EXISTS public.branches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    whatsapp_number VARCHAR(50),
    google_maps_url TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4.2 Users / Profiles Table (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    role public.app_role NOT NULL DEFAULT 'agent',
    branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
    avatar_url TEXT,
    active_status BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4.3 Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_code VARCHAR(6) UNIQUE NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50) NOT NULL,
    service_category public.service_category NOT NULL,
    status public.inquiry_status NOT NULL DEFAULT 'New',
    preferred_branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
    assigned_agent_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4.4 Knowledge Base Table (with vector support)
CREATE TABLE IF NOT EXISTS public.knowledge_base (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    embedding VECTOR(1536), -- Standard OpenAI / Gemini embedding dimension
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_users_branch_id ON public.users(branch_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_inquiries_tracking_code ON public.inquiries(tracking_code);
CREATE INDEX IF NOT EXISTS idx_inquiries_preferred_branch ON public.inquiries(preferred_branch_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_assigned_agent ON public.inquiries(assigned_agent_id);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_service_category ON public.inquiries(service_category);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON public.knowledge_base(category);

-- HNSW Vector Index for Semantic Similarity Search
CREATE INDEX IF NOT EXISTS idx_knowledge_base_embedding 
    ON public.knowledge_base 
    USING hnsw (embedding vector_cosine_ops);

-- 6. TRIGGERS AND FUNCTIONS

-- 6.1 Updated At Timestamp Trigger Function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
DROP TRIGGER IF EXISTS trg_branches_updated_at ON public.branches;
CREATE TRIGGER trg_branches_updated_at
    BEFORE UPDATE ON public.branches
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_users_updated_at ON public.users;
CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER trg_inquiries_updated_at
    BEFORE UPDATE ON public.inquiries
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_knowledge_base_updated_at ON public.knowledge_base;
CREATE TRIGGER trg_knowledge_base_updated_at
    BEFORE UPDATE ON public.knowledge_base
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 6.2 Auto-generate 6-digit Tracking Code Trigger
CREATE OR REPLACE FUNCTION public.generate_inquiry_tracking_code()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.tracking_code IS NULL OR NEW.tracking_code = '' THEN
        NEW.tracking_code := LPAD(nextval('public.inquiry_tracking_seq')::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_generate_inquiry_tracking_code ON public.inquiries;
CREATE TRIGGER trg_generate_inquiry_tracking_code
    BEFORE INSERT ON public.inquiries
    FOR EACH ROW EXECUTE FUNCTION public.generate_inquiry_tracking_code();

-- 6.3 Automatically sync auth.users to public.users on signup
CREATE OR REPLACE FUNCTION public.handle_new_user_signup()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, full_name, email, role, active_status)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', SPLIT_PART(NEW.email, '@', 1)),
        NEW.email,
        COALESCE((NEW.raw_user_meta_data->>'role')::public.app_role, 'agent'::public.app_role),
        true
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        email = EXCLUDED.email;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_on_auth_user_created ON auth.users;
CREATE TRIGGER trg_on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_signup();

-- 7. HELPER FUNCTIONS FOR ROW LEVEL SECURITY (RLS)

-- 7.1 Get current user's role
CREATE OR REPLACE FUNCTION public.get_auth_user_role()
RETURNS public.app_role AS $$
DECLARE
    u_role public.app_role;
BEGIN
    SELECT role INTO u_role
    FROM public.users
    WHERE id = auth.uid();
    
    RETURN COALESCE(u_role, 'agent'::public.app_role);
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 7.2 Get current user's assigned branch_id
CREATE OR REPLACE FUNCTION public.get_auth_user_branch_id()
RETURNS UUID AS $$
DECLARE
    b_id UUID;
BEGIN
    SELECT branch_id INTO b_id
    FROM public.users
    WHERE id = auth.uid();
    
    RETURN b_id;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 7.3 Check if current user is Super Admin
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN public.get_auth_user_role() = 'super_admin'::public.app_role;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- 8. ROW LEVEL SECURITY (RLS) POLICIES

-- Enable RLS on all tables
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;

-- 8.1 BRANCHES POLICIES
-- Anyone authenticated can read branches (needed for branch selectors)
CREATE POLICY "Allow authenticated users to read branches"
    ON public.branches
    FOR SELECT
    TO authenticated
    USING (true);

-- Only Super Admin can insert, update, or delete branches
CREATE POLICY "Allow super admin to manage branches"
    ON public.branches
    FOR ALL
    TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());

-- 8.2 USERS / PROFILES POLICIES
-- Super Admin has full read access to all users
CREATE POLICY "Super admin can read all users"
    ON public.users
    FOR SELECT
    TO authenticated
    USING (
        public.is_super_admin() 
        OR id = auth.uid() 
        OR branch_id = public.get_auth_user_branch_id()
    );

-- Users can update their own profile (name, avatar, phone), Super Admin can update any profile
CREATE POLICY "Users can update self or super admin update all"
    ON public.users
    FOR UPDATE
    TO authenticated
    USING (
        id = auth.uid() OR public.is_super_admin()
    )
    WITH CHECK (
        id = auth.uid() OR public.is_super_admin()
    );

-- Super admin can insert or delete users
CREATE POLICY "Super admin can insert users"
    ON public.users
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_super_admin() OR id = auth.uid());

CREATE POLICY "Super admin can delete users"
    ON public.users
    FOR DELETE
    TO authenticated
    USING (public.is_super_admin());

-- 8.3 INQUIRIES POLICIES (CORE RBAC MANDATE)
-- SELECT Policy:
-- Super Admin sees ALL inquiries.
-- Branch Managers & Agents can ONLY see inquiries assigned to their branch OR assigned directly to them.
CREATE POLICY "Scoped inquiry read policy"
    ON public.inquiries
    FOR SELECT
    TO authenticated
    USING (
        public.is_super_admin()
        OR preferred_branch_id = public.get_auth_user_branch_id()
        OR assigned_agent_id = auth.uid()
    );

-- INSERT Policy:
-- Super Admin can insert for any branch.
-- Branch Managers & Agents can insert inquiries for their branch or default branch context.
CREATE POLICY "Scoped inquiry insert policy"
    ON public.inquiries
    FOR INSERT
    TO authenticated
    WITH CHECK (
        public.is_super_admin()
        OR preferred_branch_id = public.get_auth_user_branch_id()
        OR preferred_branch_id IS NULL
    );

-- UPDATE Policy:
-- Super Admin can update any inquiry.
-- Branch Managers & Agents can ONLY update inquiries where preferred_branch_id matches user's branch_id OR assigned to them.
CREATE POLICY "Scoped inquiry update policy"
    ON public.inquiries
    FOR UPDATE
    TO authenticated
    USING (
        public.is_super_admin()
        OR preferred_branch_id = public.get_auth_user_branch_id()
        OR assigned_agent_id = auth.uid()
    )
    WITH CHECK (
        public.is_super_admin()
        OR preferred_branch_id = public.get_auth_user_branch_id()
        OR assigned_agent_id = auth.uid()
    );

-- DELETE Policy:
-- Only Super Admin can delete inquiries.
CREATE POLICY "Super admin can delete inquiries"
    ON public.inquiries
    FOR DELETE
    TO authenticated
    USING (public.is_super_admin());

-- 8.4 KNOWLEDGE BASE POLICIES
-- All staff members (Super Admin, Branch Managers, Agents) can read knowledge base articles
CREATE POLICY "Staff can view knowledge base"
    ON public.knowledge_base
    FOR SELECT
    TO authenticated
    USING (true);

-- Only Super Admin can write/edit/delete knowledge base content
CREATE POLICY "Super admin manages knowledge base"
    ON public.knowledge_base
    FOR ALL
    TO authenticated
    USING (public.is_super_admin())
    WITH CHECK (public.is_super_admin());
