import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { AppRole } from '@prisma/client';
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

    const users = await prisma.user.findMany({
      include: {
        branch: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedStaff = users.map((u: any) => ({
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
    return createErrorResponse(error, 'Failed to fetch staff members. Please try again.');
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
        { success: false, error: 'Insufficient permissions to add staff members.' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { fullName, email, phone, role, branchId } = body;

    if (!fullName || !email) {
      return NextResponse.json(
        { success: false, error: 'Full name and email are required.' },
        { status: 400 }
      );
    }

    // Input length validation
    if (fullName.length > 255 || email.length > 255 || (phone && phone.length > 50)) {
      return NextResponse.json(
        { success: false, error: 'Input length exceeds the maximum allowed limits.' },
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
    const newUserId = crypto.randomUUID();

    const newUser = await prisma.user.create({
      data: {
        id: newUserId,
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
    return createErrorResponse(error, 'Failed to add staff member. Please try again.');
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

    if (userRole !== 'super_admin') {
      return NextResponse.json(
        { success: false, error: 'Insufficient permissions to delete staff members.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Staff member ID is required for deletion.' },
        { status: 400 }
      );
    }

    // Delete staff user record from database
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Staff profile and associated personal data deleted successfully.',
    });
  } catch (error: any) {
    return createErrorResponse(error, 'Failed to delete staff member. Please try again.');
  }
}
