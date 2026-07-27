import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ServiceCategory } from '@prisma/client';
import { createErrorResponse } from '@/lib/errors';

function mapToServiceCategoryEnum(catString: string): ServiceCategory {
  const normalized = (catString || '').toLowerCase();
  if (normalized.includes('umrah') || normalized.includes('tourism')) {
    return 'Umrah' as ServiceCategory;
  }
  if (normalized.includes('flight') || normalized.includes('ticket')) {
    return 'Flight_Ticketing' as ServiceCategory;
  }
  if (normalized.includes('malumat') || normalized.includes('passport')) {
    return 'Passport_Malumat' as ServiceCategory;
  }
  if (normalized.includes('ziyarah') || normalized.includes('visa')) {
    return 'Ziyarah_Visa' as ServiceCategory;
  }
  if (normalized.includes('misa') || normalized.includes('investor')) {
    return 'MISA_Investor_License' as ServiceCategory;
  }
  if (normalized.includes('qiwa') || normalized.includes('amel') || normalized.includes('labor')) {
    return 'Qiwa_Amel_Issues' as ServiceCategory;
  }
  if (normalized.includes('cargo')) {
    return 'Cargo' as ServiceCategory;
  }
  return 'Umrah' as ServiceCategory;
}

function generateTrackingCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let random = '';
  for (let i = 0; i < 3; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `BMT${random}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      client_name,
      client_phone,
      service_category,
      service_title,
      branch_city,
      preferred_branch_id,
      notes,
    } = body;

    if (!client_name || !client_phone) {
      return NextResponse.json(
        { error: 'Full Name and Phone / WhatsApp number are required.' },
        { status: 400 }
      );
    }

    // Input length validation
    if (client_name.length > 255 || client_phone.length > 50 || (notes && notes.length > 2000) || (service_title && service_title.length > 255) || (branch_city && branch_city.length > 100)) {
      return NextResponse.json(
        { error: 'Input length exceeds the maximum allowed limits.' },
        { status: 400 }
      );
    }

    const categoryEnum = mapToServiceCategoryEnum(service_category || service_title || '');

    // 1. Resolve Target Branch
    let targetBranch = null;

    if (preferred_branch_id) {
      targetBranch = await prisma.branch.findUnique({
        where: { id: preferred_branch_id },
      });
    }

    if (!targetBranch && branch_city) {
      targetBranch = await prisma.branch.findFirst({
        where: {
          OR: [
            { city: { contains: branch_city, mode: 'insensitive' } },
            { name: { contains: branch_city, mode: 'insensitive' } },
          ],
        },
      });
    }

    if (!targetBranch) {
      targetBranch = await prisma.branch.findFirst({
        where: { status: 'active' },
      });
    }

    // 2. Find Active Staff Agent at Selected Branch for Instant Auto-Assignment
    let assignedAgent = null;
    if (targetBranch) {
      assignedAgent = await prisma.user.findFirst({
        where: {
          branchId: targetBranch.id,
          activeStatus: true,
        },
      });
    }

    // 3. Generate Unique 6-Character Tracking Code
    let trackingCode = generateTrackingCode();
    let existing = await prisma.inquiry.findUnique({
      where: { trackingCode },
    });
    let attempts = 0;
    while (existing && attempts < 5) {
      trackingCode = generateTrackingCode();
      existing = await prisma.inquiry.findUnique({
        where: { trackingCode },
      });
      attempts++;
    }

    // 4. Combine Notes with Service Title
    const formattedNotes = [
      service_title ? `Requested Service: ${service_title}` : null,
      notes ? `Customer Notes: ${notes}` : null,
    ]
      .filter(Boolean)
      .join(' | ');

    // 5. Create Inquiry Record in Supabase via Prisma
    const newInquiry = await prisma.inquiry.create({
      data: {
        trackingCode,
        clientName: client_name.trim(),
        clientPhone: client_phone.trim(),
        serviceCategory: categoryEnum,
        status: 'New',
        preferredBranchId: targetBranch?.id || null,
        assignedAgentId: assignedAgent?.id || null,
        notes: formattedNotes || null,
      },
      include: {
        preferredBranch: true,
        assignedAgent: true,
      },
    });

    const branchName = targetBranch?.name || 'Riyadh Batha Main Branch';
    const whatsappNum = targetBranch?.whatsappNumber || targetBranch?.phone || '966500000001';
    const cleanWhatsapp = whatsappNum.replace(/[^0-9]/g, '');

    const prefilledText = `Assalamu Alaikum, I just submitted an inquiry on Bin Mishal website for ${
      service_title || service_category || 'Travel Service'
    }. My Tracking Code is #${trackingCode}. Please assist me.`;

    const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(prefilledText)}`;

    return NextResponse.json({
      success: true,
      tracking_code: trackingCode,
      inquiry_id: newInquiry.id,
      assigned_branch: {
        id: targetBranch?.id,
        name: branchName,
        city: targetBranch?.city || 'Riyadh',
        phone: targetBranch?.phone,
        whatsapp: whatsappNum,
      },
      assigned_agent: assignedAgent
        ? {
            id: assignedAgent.id,
            name: assignedAgent.fullName,
            role: assignedAgent.role,
          }
        : null,
      whatsapp_url: whatsappUrl,
    });
  } catch (error: any) {
    return createErrorResponse(error, 'Failed to submit inquiry. Please try again later.');
  }
}
