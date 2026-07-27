-- ==============================================================================
-- BIN MISAL TRAVELS - PRODUCTION SEED DATA
-- Seed File: Initial Saudi Arabia Branches, Users, Inquiries, and Knowledge Base
-- ==============================================================================

-- 1. SEED BRANCHES
INSERT INTO public.branches (id, name, city, phone, whatsapp_number, google_maps_url, status)
VALUES
    ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Riyadh Batha Head Office', 'Riyadh', '+966114012345', '+966501112233', 'https://maps.google.com/?q=24.6333,46.7167', 'active'),
    ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Dammam Regional Branch', 'Dammam', '+966138012345', '+966502223344', 'https://maps.google.com/?q=26.4207,50.0888', 'active'),
    ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Madinah Central Branch', 'Madinah', '+966148012345', '+966503334455', 'https://maps.google.com/?q=24.4672,39.6112', 'active'),
    ('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Jeddah Al-Balad Branch', 'Jeddah', '+966126012345', '+966504445566', 'https://maps.google.com/?q=21.4858,39.1925', 'active')
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    city = EXCLUDED.city,
    phone = EXCLUDED.phone,
    whatsapp_number = EXCLUDED.whatsapp_number,
    google_maps_url = EXCLUDED.google_maps_url,
    status = EXCLUDED.status;

-- 2. SEED KNOWLEDGE BASE
INSERT INTO public.knowledge_base (id, category, title, content, tags)
VALUES
    (
        'e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55',
        'Umrah Requirements',
        '2026 Umrah Visa Guidelines for Expatriates',
        'Requirements for Umrah visa issuance in Saudi Arabia: 1. Valid Iqama (minimum 3 months validity). 2. Nusuk app registration for Rawdah permit. 3. Confirmed hotel booking in Makkah & Madinah. 4. Return flight reservation.',
        ARRAY['umrah', 'visa', 'iqama', 'nusuk']
    ),
    (
        'f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66',
        'Business Services',
        'MISA Investor License Processing Flow',
        'Steps for foreign investors to obtain a Ministry of Investment (MISA) license in Saudi Arabia: 1. Commercial Registration from home country notarized by Saudi Embassy. 2. Financial statements for past fiscal year. 3. Article of Association draft. 4. Application submission via MISA portal.',
        ARRAY['misa', 'investor', 'business', 'cr', 'qiwa']
    ),
    (
        '11eebc99-9c0b-4ef8-bb6d-6bb9bd380a77',
        'Government Services',
        'Qiwa & Amel Labor Transfer Resolution Process',
        'Resolution matrix for Qiwa labor transfer issues: Verify Nitaqat status, check pending labor court cases, ensure no existing contract violations, and submit request through the Ministry of Human Resources portal.',
        ARRAY['qiwa', 'amel', 'labor', 'nitaqat', 'hrsd']
    )
ON CONFLICT (id) DO NOTHING;

-- 3. SEED INITIAL SAMPLE INQUIRIES
INSERT INTO public.inquiries (tracking_code, client_name, client_phone, service_category, status, preferred_branch_id, notes)
VALUES
    ('100001', 'Mohammed Al-Otaibi', '+966551234567', 'Umrah', 'New', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Family Umrah package inquiry for 5 adults starting next Friday.'),
    ('100002', 'Tariq Rahman', '+966569876543', 'MISA Investor License', 'Processing', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Client wants consultation on 100% foreign ownership company setup.'),
    ('100003', 'Faisal Khan', '+966541122334', 'Flight Ticketing', 'New', 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22', 'Direct flights Dammam to Dhaka round trip.'),
    ('100004', 'Abdullah Al-Ghamdi', '+966503344556', 'Ziyarah Visa', 'Action Required', 'c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33', 'Multiple entry family visit visa extension assistance.'),
    ('100005', 'Shahid Islam', '+966556677889', 'Qiwa/Amel Issues', 'Processing', 'd0eebc99-9c0b-4ef8-bb6d-6bb9bd380a44', 'Sponsor transfer contract pending approval on Qiwa platform.')
ON CONFLICT (tracking_code) DO NOTHING;
