import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret') || request.headers.get('x-seed-secret');
    const expectedSecret = process.env.ADMIN_SEED_SECRET || 'bin_misal_seed_secret_2026';

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid seed secret key.' },
        { status: 401 }
      );
    }

    // 1. Seed Branches
    const branchRiyadh = await prisma.branch.upsert({
      where: { id: 'a1111111-1111-4111-a111-111111111111' },
      update: {
        name: 'Riyadh Batha Main Branch',
        city: 'Riyadh',
        phone: '+966500000001',
        whatsappNumber: '+966500000001',
        googleMapsUrl: 'https://maps.google.com/?q=Batha+Commercial+Center+Riyadh',
        status: 'active',
      },
      create: {
        id: 'a1111111-1111-4111-a111-111111111111',
        name: 'Riyadh Batha Main Branch',
        city: 'Riyadh',
        phone: '+966500000001',
        whatsappNumber: '+966500000001',
        googleMapsUrl: 'https://maps.google.com/?q=Batha+Commercial+Center+Riyadh',
        status: 'active',
      },
    });

    const branchDammam = await prisma.branch.upsert({
      where: { id: 'b2222222-2222-4222-b222-222222222222' },
      update: {
        name: 'Dammam City Branch',
        city: 'Dammam',
        phone: '+966500000002',
        whatsappNumber: '+966500000002',
        googleMapsUrl: 'https://maps.google.com/?q=King+Fahd+Street+Dammam',
        status: 'active',
      },
      create: {
        id: 'b2222222-2222-4222-b222-222222222222',
        name: 'Dammam City Branch',
        city: 'Dammam',
        phone: '+966500000002',
        whatsappNumber: '+966500000002',
        googleMapsUrl: 'https://maps.google.com/?q=King+Fahd+Street+Dammam',
        status: 'active',
      },
    });

    const branchMadinah = await prisma.branch.upsert({
      where: { id: 'c3333333-3333-4333-c333-333333333333' },
      update: {
        name: 'Madinah Central Branch',
        city: 'Madinah',
        phone: '+966500000003',
        whatsappNumber: '+966500000003',
        googleMapsUrl: 'https://maps.google.com/?q=Near+Prophets+Mosque+Madinah',
        status: 'active',
      },
      create: {
        id: 'c3333333-3333-4333-c333-333333333333',
        name: 'Madinah Central Branch',
        city: 'Madinah',
        phone: '+966500000003',
        whatsappNumber: '+966500000003',
        googleMapsUrl: 'https://maps.google.com/?q=Near+Prophets+Mosque+Madinah',
        status: 'active',
      },
    });

    // 2. Seed Users / Staff
    const userSuperAdmin = await prisma.user.upsert({
      where: { id: 'd4444444-4444-4444-d444-444444444444' },
      update: {
        fullName: 'Injamul Hoque',
        email: 'injamul@binmisal.com',
        phone: '+966500000999',
        role: 'super_admin',
        branchId: null,
        activeStatus: true,
      },
      create: {
        id: 'd4444444-4444-4444-d444-444444444444',
        fullName: 'Injamul Hoque',
        email: 'injamul@binmisal.com',
        phone: '+966500000999',
        role: 'super_admin',
        branchId: null,
        activeStatus: true,
      },
    });

    const userRiyadhManager = await prisma.user.upsert({
      where: { id: 'e5555555-5555-4555-e555-555555555555' },
      update: {
        fullName: 'Rafiqul Islam',
        email: 'rafiqul.riyadh@binmisal.com',
        phone: '+966500000001',
        role: 'branch_manager',
        branchId: branchRiyadh.id,
        activeStatus: true,
      },
      create: {
        id: 'e5555555-5555-4555-e555-555555555555',
        fullName: 'Rafiqul Islam',
        email: 'rafiqul.riyadh@binmisal.com',
        phone: '+966500000001',
        role: 'branch_manager',
        branchId: branchRiyadh.id,
        activeStatus: true,
      },
    });

    const userDammamAgent = await prisma.user.upsert({
      where: { id: 'f6666666-6666-4666-f666-666666666666' },
      update: {
        fullName: 'Tariqul Anam',
        email: 'tariqul.dammam@binmisal.com',
        phone: '+966500000002',
        role: 'agent',
        branchId: branchDammam.id,
        activeStatus: true,
      },
      create: {
        id: 'f6666666-6666-4666-f666-666666666666',
        fullName: 'Tariqul Anam',
        email: 'tariqul.dammam@binmisal.com',
        phone: '+966500000002',
        role: 'agent',
        branchId: branchDammam.id,
        activeStatus: true,
      },
    });

    const userMadinahAgent = await prisma.user.upsert({
      where: { id: '07777777-7777-4777-a777-777777777777' },
      update: {
        fullName: 'Shakil Ahmed',
        email: 'shakil.madinah@binmisal.com',
        phone: '+966500000003',
        role: 'agent',
        branchId: branchMadinah.id,
        activeStatus: true,
      },
      create: {
        id: '07777777-7777-4777-a777-777777777777',
        fullName: 'Shakil Ahmed',
        email: 'shakil.madinah@binmisal.com',
        phone: '+966500000003',
        role: 'agent',
        branchId: branchMadinah.id,
        activeStatus: true,
      },
    });

    // 3. Seed Inquiries / Leads
    const lead1 = await prisma.inquiry.upsert({
      where: { trackingCode: 'BMT101' },
      update: {
        clientName: 'Kabir Hossain',
        clientPhone: '+966511111111',
        serviceCategory: 'Passport_Malumat',
        status: 'New',
        preferredBranchId: branchRiyadh.id,
        assignedAgentId: userRiyadhManager.id,
        notes: 'Needs urgent passport data transfer to new passport.',
      },
      create: {
        trackingCode: 'BMT101',
        clientName: 'Kabir Hossain',
        clientPhone: '+966511111111',
        serviceCategory: 'Passport_Malumat',
        status: 'New',
        preferredBranchId: branchRiyadh.id,
        assignedAgentId: userRiyadhManager.id,
        notes: 'Needs urgent passport data transfer to new passport.',
      },
    });

    const lead2 = await prisma.inquiry.upsert({
      where: { trackingCode: 'BMT102' },
      update: {
        clientName: 'Mohammed Ali',
        clientPhone: '+966522222222',
        serviceCategory: 'Umrah',
        status: 'Processing',
        preferredBranchId: branchDammam.id,
        assignedAgentId: userDammamAgent.id,
        notes: 'Inquired about 14-day Umrah package for family.',
      },
      create: {
        trackingCode: 'BMT102',
        clientName: 'Mohammed Ali',
        clientPhone: '+966522222222',
        serviceCategory: 'Umrah',
        status: 'Processing',
        preferredBranchId: branchDammam.id,
        assignedAgentId: userDammamAgent.id,
        notes: 'Inquired about 14-day Umrah package for family.',
      },
    });

    const lead3 = await prisma.inquiry.upsert({
      where: { trackingCode: 'BMT103' },
      update: {
        clientName: 'Sumon Ahmed',
        clientPhone: '+966533333333',
        serviceCategory: 'Flight_Ticketing',
        status: 'Completed',
        preferredBranchId: branchMadinah.id,
        assignedAgentId: userMadinahAgent.id,
        notes: 'Booked Saudia Flight ticket to Dhaka.',
      },
      create: {
        trackingCode: 'BMT103',
        clientName: 'Sumon Ahmed',
        clientPhone: '+966533333333',
        serviceCategory: 'Flight_Ticketing',
        status: 'Completed',
        preferredBranchId: branchMadinah.id,
        assignedAgentId: userMadinahAgent.id,
        notes: 'Booked Saudia Flight ticket to Dhaka.',
      },
    });

    const lead4 = await prisma.inquiry.upsert({
      where: { trackingCode: 'BMT104' },
      update: {
        clientName: 'Kamal Uddin',
        clientPhone: '+966544444444',
        serviceCategory: 'MISA_Investor_License',
        status: 'Action_Required',
        preferredBranchId: branchRiyadh.id,
        assignedAgentId: userSuperAdmin.id,
        notes: 'Wants to know foreign business ownership requirements.',
      },
      create: {
        trackingCode: 'BMT104',
        clientName: 'Kamal Uddin',
        clientPhone: '+966544444444',
        serviceCategory: 'MISA_Investor_License',
        status: 'Action_Required',
        preferredBranchId: branchRiyadh.id,
        assignedAgentId: userSuperAdmin.id,
        notes: 'Wants to know foreign business ownership requirements.',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Database successfully populated with demo seed data!',
      counts: {
        branches: 3,
        users: 4,
        inquiries: 4,
      },
      data: {
        branches: [branchRiyadh.name, branchDammam.name, branchMadinah.name],
        users: [
          userSuperAdmin.fullName,
          userRiyadhManager.fullName,
          userDammamAgent.fullName,
          userMadinahAgent.fullName,
        ],
        inquiries: [lead1.trackingCode, lead2.trackingCode, lead3.trackingCode, lead4.trackingCode],
      },
    });
  } catch (error: any) {
    console.error('Seed API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed database.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}
