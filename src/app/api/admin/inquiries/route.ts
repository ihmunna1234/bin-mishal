import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ServiceCategory, InquiryStatus } from '@prisma/client';
import { createErrorResponse } from '@/lib/errors';
import { headers } from 'next/headers';

export async function GET() {
  try {
    const headersList = headers();
    const userId = headersList.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required.' },
        { status: 401 }
      );
    }

    const inquiries = await prisma.inquiry.findMany({
      include: {
        preferredBranch: true,
        assignedAgent: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedInquiries = inquiries.map((inq: any) => ({
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
    return createErrorResponse(error, 'Failed to fetch inquiries. Please try again.');
  }
}

export async function POST(request: NextRequest) {
  try {
    const headersList = headers();
    const userId = headersList.get('x-user-id');
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required.' },
        { status: 401 }
      );
    }

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

    // Input length validations
    if (clientName.length > 255 || clientPhone.length > 50 || (notes && notes.length > 2000)) {
      return NextResponse.json(
        { success: false, error: 'Input length exceeds the maximum allowed limits.' },
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
    return createErrorResponse(error, 'Failed to create lead. Please try again.');
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const headersList = headers();
    const userId = headersList.get('x-user-id');
    const userRole = headersList.get('x-user-role');

    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required.' },
        { status: 401 }
      );
    }

    if (userRole !== 'super_admin' && userRole !== 'branch_manager') {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions to delete inquiries.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Inquiry ID is required for deletion.' },
        { status: 400 }
      );
    }

    // Permanently remove inquiry lead and personal data
    await prisma.inquiry.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry record and associated personal data erased successfully.',
    });
  } catch (error: any) {
    return createErrorResponse(error, 'Failed to delete inquiry record. Please try again.');
  }
}
