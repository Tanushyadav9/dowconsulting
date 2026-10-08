import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const authContext = await getAuthContext();
    if (!authContext.isOwner && !authContext.permissions?.canManageTeam) {
      return NextResponse.json(
        { error: "Unauthorized. Public team profiles can only be managed by practice leadership." },
        { status: 403 }
      );
    }

    const members = await prisma.publicTeamMember.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ success: true, members });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authContext = await getAuthContext();
    if (!authContext.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized. Only the Owner can create or publish public team profiles." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { name, roleTitle, bio, photoUrl, order, isPublished } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!roleTitle?.trim()) {
      return NextResponse.json({ error: "Role title is required" }, { status: 400 });
    }
    if (!bio?.trim()) {
      return NextResponse.json({ error: "Short bio is required" }, { status: 400 });
    }

    const member = await prisma.publicTeamMember.create({
      data: {
        name: name.trim(),
        roleTitle: roleTitle.trim(),
        bio: bio.trim(),
        photoUrl: photoUrl?.trim() || null,
        order: typeof order === "number" ? order : 0,
        isPublished: Boolean(isPublished),
      },
    });

    return NextResponse.json({ success: true, member, message: "Team profile created successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const authContext = await getAuthContext();
    if (!authContext.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized. Only the Owner can modify public team profiles." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { id, name, roleTitle, bio, photoUrl, order, isPublished } = body;

    if (!id) {
      return NextResponse.json({ error: "Profile ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (typeof name === "string") updateData.name = name.trim();
    if (typeof roleTitle === "string") updateData.roleTitle = roleTitle.trim();
    if (typeof bio === "string") updateData.bio = bio.trim();
    if (photoUrl !== undefined) updateData.photoUrl = photoUrl?.trim() || null;
    if (typeof order === "number") updateData.order = order;
    if (typeof isPublished === "boolean") updateData.isPublished = isPublished;

    const updated = await prisma.publicTeamMember.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, member: updated, message: "Team profile updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authContext = await getAuthContext();
    if (!authContext.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized. Only the Owner can delete public team profiles." },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Profile ID is required" }, { status: 400 });
    }

    await prisma.publicTeamMember.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Team profile removed successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
