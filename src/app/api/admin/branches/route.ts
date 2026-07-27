import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const branches = await prisma.branch.findMany({
      include: {
        users: true,
        inquiries: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedBranches = branches.map((b) => ({
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
    console.error('GET /api/admin/branches error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch branches' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, city, phone, whatsapp, mapsUrl, status } = body;

    if (!name || !city) {
      return NextResponse.json(
        { success: false, error: 'Branch name and city are required.' },
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
    console.error('POST /api/admin/branches error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create branch.' },
      { status: 500 }
    );
  }
}
