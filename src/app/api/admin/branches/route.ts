import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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

    const branches = await prisma.branch.findMany({
      include: {
        users: true,
        inquiries: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedBranches = branches.map((b: any) => ({
      id: b.id,
      name: b.name,
      city: b.city,
      phone: b.phone || '',
      whatsapp: b.whatsappNumber || '',
      mapsUrl: b.googleMapsUrl || '',
      status: b.status,
      staffCount: b.users.length,
      inquiryCount: b.inquiries.length,
    }));

    return NextResponse.json({ success: true, branches: formattedBranches });
  } catch (error: any) {
    return createErrorResponse(error, 'Failed to fetch branches. Please try again.');
  }
}

export async function POST(request: NextRequest) {
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

    if (userRole !== 'super_admin') {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions to manage branches.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { name, city, phone, whatsapp, mapsUrl, status } = body;

    if (!name || !city) {
      return NextResponse.json(
        { success: false, error: 'Branch name and city are required.' },
        { status: 400 }
      );
    }

    // Input length validation
    if (name.length > 255 || city.length > 100 || (phone && phone.length > 50) || (whatsapp && whatsapp.length > 50) || (mapsUrl && mapsUrl.length > 1000) || (status && status.length > 50)) {
      return NextResponse.json(
        { success: false, error: 'Input length exceeds the maximum allowed limits.' },
        { status: 400 }
      );
    }

    const newBranch = await prisma.branch.create({
      data: {
        name: name.trim(),
        city: city.trim(),
        phone: phone ? phone.trim() : null,
        whatsappNumber: whatsapp ? whatsapp.trim() : null,
        googleMapsUrl: mapsUrl ? mapsUrl.trim() : null,
        status: status || 'active',
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Branch created successfully!',
      branch: {
        id: newBranch.id,
        name: newBranch.name,
        city: newBranch.city,
        phone: newBranch.phone || '',
        whatsapp: newBranch.whatsappNumber || '',
        mapsUrl: newBranch.googleMapsUrl || '',
        status: newBranch.status,
        staffCount: 0,
        inquiryCount: 0,
      },
    });
  } catch (error: any) {
    return createErrorResponse(error, 'Failed to create branch. Please try again.');
  }
}
