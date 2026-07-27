-- ==============================================================================
-- BIN MISAL TRAVELS - PRODUCTION & DEMO SEED SCRIPT
-- Database: PostgreSQL 15+ / Supabase
-- Description: Inserts structured test data for Branches, Users (Staff), and Inquiries
-- ==============================================================================

BEGIN;

-- 1. SEED BRANCHES
INSERT INTO public.branches (id, name, city, phone, whatsapp_number, google_maps_url, status)
VALUES
    (
        'a1111111-1111-4111-a111-111111111111',
        'Riyadh Batha Main Branch',
        'Riyadh',
        '+966500000001',
        '+966500000001',
        'https://maps.google.com/?q=Batha+Commercial+Center+Riyadh',
        'active'
    ),
    (
        'b2222222-2222-4222-b222-222222222222',
        'Dammam City Branch',
        'Dammam',
        '+966500000002',
        '+966500000002',
        'https://maps.google.com/?q=King+Fahd+Street+Dammam',
        'active'
    ),
    (
        'c3333333-3333-4333-c333-333333333333',
        'Madinah Central Branch',
        'Madinah',
        '+966500000003',
        '+966500000003',
        'https://maps.google.com/?q=Near+Prophets+Mosque+Madinah',
        'active'
    )
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    city = EXCLUDED.city,
    phone = EXCLUDED.phone,
    whatsapp_number = EXCLUDED.whatsapp_number,
    google_maps_url = EXCLUDED.google_maps_url,
    status = EXCLUDED.status;


-- 2. SEED USERS / STAFF DATA
-- 2.1 Insert into auth.users (Supabase Auth schema dependency)
INSERT INTO auth.users (
    instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
    raw_app_meta_data, raw_user_meta_data, created_at, updated_at
)
VALUES
    (
        '00000000-0000-0000-0000-000000000000',
        'd4444444-4444-4444-d444-444444444444',
        'authenticated',
        'authenticated',
        'injamul@binmisal.com',
        crypt('AdminPassword123!', gen_salt('bf')),
        NOW(),
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Injamul Hoque"}',
        NOW(),
        NOW()
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'e5555555-5555-4555-e555-555555555555',
        'authenticated',
        'authenticated',
        'rafiqul.riyadh@binmisal.com',
        crypt('ManagerPassword123!', gen_salt('bf')),
        NOW(),
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Rafiqul Islam"}',
        NOW(),
        NOW()
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        'f6666666-6666-4666-f666-666666666666',
        'authenticated',
        'authenticated',
        'tariqul.dammam@binmisal.com',
        crypt('AgentPassword123!', gen_salt('bf')),
        NOW(),
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Tariqul Anam"}',
        NOW(),
        NOW()
    ),
    (
        '00000000-0000-0000-0000-000000000000',
        '07777777-7777-4777-a777-777777777777',
        'authenticated',
        'authenticated',
        'shakil.madinah@binmisal.com',
        crypt('AgentPassword123!', gen_salt('bf')),
        NOW(),
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Shakil Ahmed"}',
        NOW(),
        NOW()
    )
ON CONFLICT (id) DO NOTHING;

-- 2.2 Insert into public.users (Application profiles linked to auth.users)
INSERT INTO public.users (id, full_name, email, phone, role, branch_id, active_status)
VALUES
    (
        'd4444444-4444-4444-d444-444444444444',
        'Injamul Hoque',
        'injamul@binmisal.com',
        '+966500000999',
        'super_admin'::public.app_role,
        NULL,
        true
    ),
    (
        'e5555555-5555-4555-e555-555555555555',
        'Rafiqul Islam',
        'rafiqul.riyadh@binmisal.com',
        '+966500000001',
        'branch_manager'::public.app_role,
        'a1111111-1111-4111-a111-111111111111',
        true
    ),
    (
        'f6666666-6666-4666-f666-666666666666',
        'Tariqul Anam',
        'tariqul.dammam@binmisal.com',
        '+966500000002',
        'agent'::public.app_role,
        'b2222222-2222-4222-b222-222222222222',
        true
    ),
    (
        '07777777-7777-4777-a777-777777777777',
        'Shakil Ahmed',
        'shakil.madinah@binmisal.com',
        '+966500000003',
        'agent'::public.app_role,
        'c3333333-3333-4333-c333-333333333333',
        true
    )
ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role,
    branch_id = EXCLUDED.branch_id,
    active_status = EXCLUDED.active_status;


-- 3. SEED REALISTIC INQUIRIES / LEADS DATA
INSERT INTO public.inquiries (
    tracking_code, client_name, client_phone, service_category, status,
    preferred_branch_id, assigned_agent_id, notes
)
VALUES
    (
        'BMT101',
        'Kabir Hossain',
        '+966511111111',
        'Passport Malumat'::public.service_category,
        'New'::public.inquiry_status,
        'a1111111-1111-4111-a111-111111111111',
        'e5555555-5555-4555-e555-555555555555',
        'Needs urgent passport data transfer to new passport.'
    ),
    (
        'BMT102',
        'Mohammed Ali',
        '+966522222222',
        'Umrah'::public.service_category,
        'Processing'::public.inquiry_status,
        'b2222222-2222-4222-b222-222222222222',
        'f6666666-6666-4666-f666-666666666666',
        'Inquired about 14-day Umrah package for family.'
    ),
    (
        'BMT103',
        'Sumon Ahmed',
        '+966533333333',
        'Flight Ticketing'::public.service_category,
        'Completed'::public.inquiry_status,
        'c3333333-3333-4333-c333-333333333333',
        '07777777-7777-4777-a777-777777777777',
        'Booked Saudia Flight ticket to Dhaka.'
    ),
    (
        'BMT104',
        'Kamal Uddin',
        '+966544444444',
        'MISA Investor License'::public.service_category,
        'Action Required'::public.inquiry_status,
        'a1111111-1111-4111-a111-111111111111',
        'd4444444-4444-4444-d444-444444444444',
        'Wants to know foreign business ownership requirements.'
    )
ON CONFLICT (tracking_code) DO UPDATE SET
    client_name = EXCLUDED.client_name,
    client_phone = EXCLUDED.client_phone,
    service_category = EXCLUDED.service_category,
    status = EXCLUDED.status,
    preferred_branch_id = EXCLUDED.preferred_branch_id,
    assigned_agent_id = EXCLUDED.assigned_agent_id,
    notes = EXCLUDED.notes;

COMMIT;
