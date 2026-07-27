import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ServiceCategory, InquiryStatus } from '@prisma/client';

export async function GET() {
  try {
    const inquiries = await prisma.inquiry.findMany({
      include: {
        preferredBranch: true,
        assignedAgent: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedInquiries = inquiries.map((inq) => ({
      id: inq.id,
      tracking_code: inq.trackingCode,
      client_name: inq.clientName,
      client_phone: inq.clientPhone,
      service_category: inq.serviceCategory.replace('_', ' '),
      status: inq.status.replace('_', ' '),
      branch_id: inq.preferredBranchId,
      branch_name: inq.preferredBranch?.name || 'Riyadh Head Office',
      assigned_agent_id: inq.assignedAgentId,
      assigned_agent: inq.assignedAgent?.fullName || 'Unassigned',
      notes: inq.notes || '',
      created_at: inq.createdAt.toISOString().split('T')[0],
    }));

    return NextResponse.json({ success: true, inquiries: formattedInquiries });
  } catch (error: any) {
    console.error('GET /api/admin/inquiries error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      clientName,
      clientPhone,
      serviceCategory,
      preferredBranchId,
      assignedAgentId,
      status,
      notes,
    } = body;

    if (!clientName || !clientPhone || !serviceCategory) {
      return NextResponse.json(
        { success: false, error: 'Client name, phone number, and service category are required.' },
        { status: 400 }
      );
    }

    // Auto-generate 6-character tracking code
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const trackingCode = `BMT${randomSuffix}`;

    // Format service category enum
    let categoryEnum: ServiceCategory = 'Umrah';
    if (serviceCategory === 'Flight Ticketing') categoryEnum = 'Flight_Ticketing';
    else if (serviceCategory === 'Passport Malumat') categoryEnum = 'Passport_Malumat';
    else if (serviceCategory === 'Ziyarah Visa') categoryEnum = 'Ziyarah_Visa';
    else if (serviceCategory === 'MISA Investor License') categoryEnum = 'MISA_Investor_License';
    else if (serviceCategory === 'Qiwa/Amel Issues') categoryEnum = 'Qiwa_Amel_Issues';
    else if (serviceCategory === 'Cargo') categoryEnum = 'Cargo';

    // Format inquiry status enum
    let statusEnum: InquiryStatus = 'New';
    if (status === 'Processing') statusEnum = 'Processing';
    else if (status === 'Action Required') statusEnum = 'Action_Required';
    else if (status === 'Completed') statusEnum = 'Completed';
    else if (status === 'Cancelled') statusEnum = 'Cancelled';

    const newInquiry = await prisma.inquiry.create({
      data: {
        trackingCode,
        clientName: clientName.trim(),
        clientPhone: clientPhone.trim(),
        serviceCategory: categoryEnum,
        status: statusEnum,
        preferredBranchId: preferredBranchId && preferredBranchId !== 'none' ? preferredBranchId : null,
        assignedAgentId: assignedAgentId && assignedAgentId !== 'none' ? assignedAgentId : null,
        notes: notes ? notes.trim() : null,
      },
      include: {
        preferredBranch: true,
        assignedAgent: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry created successfully!',
      inquiry: {
        id: newInquiry.id,
        tracking_code: newInquiry.trackingCode,
        client_name: newInquiry.clientName,
        client_phone: newInquiry.clientPhone,
        service_category: serviceCategory,
        status: status || 'New',
        branch_id: newInquiry.preferredBranchId,
        branch_name: newInquiry.preferredBranch?.name || 'Riyadh Head Office',
        assigned_agent_id: newInquiry.assignedAgentId,
        assigned_agent: newInquiry.assignedAgent?.fullName || 'Unassigned',
        notes: newInquiry.notes || '',
        created_at: newInquiry.createdAt.toISOString().split('T')[0],
      },
    });
  } catch (error: any) {
    console.error('POST /api/admin/inquiries error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create lead.' },
      { status: 500 }
    );
  }
}
