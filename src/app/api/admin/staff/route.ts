import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AppRole } from '@prisma/client';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        branch: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedStaff = users.map((u) => ({
      id: u.id,
      full_name: u.fullName,
      email: u.email,
      phone: u.phone || '',
      role: u.role,
      branch_id: u.branchId,
      branch_name: u.branch?.name || 'Global HQ',
      active_status: u.activeStatus,
      joined_date: u.createdAt.toISOString().split('T')[0],
    }));

    return NextResponse.json({ success: true, staff: formattedStaff });
  } catch (error: any) {
    console.error('GET /api/admin/staff error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch staff members' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, role, branchId } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: 'Full name and email are required.' },
        { status: 400 }
      );
    }

    // Check if user email already exists
    const existing = await prisma.user.findUnique({
      where: { email: email.trim() },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A staff member with this email already exists.' },
        { status: 400 }
      );
    }

    // Generate a valid UUID for the new user profile
    const userId = crypto.randomUUID();

    const newUser = await prisma.user.create({
      data: {
        id: userId,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        role: (role as AppRole) || 'agent',
        branchId: branchId && branchId !== 'none' ? branchId : null,
        activeStatus: true,
      },
      include: {
        branch: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Staff member added successfully!',
      staff: {
        id: newUser.id,
        full_name: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone || '',
        role: newUser.role,
        branch_id: newUser.branchId,
        branch_name: newUser.branch?.name || 'Global HQ',
        active_status: newUser.activeStatus,
        joined_date: newUser.createdAt.toISOString().split('T')[0],
      },
    });
  } catch (error: any) {
    console.error('POST /api/admin/staff error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to add staff member.' },
      { status: 500 }
    );
  }
}
