import { NextRequest, NextResponse } from "next/server";
import { getAuthContext } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const authContext = await getAuthContext();
    if (!authContext.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized. Roles can only be viewed by the designated Owner." },
        { status: 403 }
      );
    }

    const roles = await prisma.teamRole.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ success: true, roles });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authContext = await getAuthContext();
    if (!authContext.isOwner) {
      return NextResponse.json(
        { error: "Unauthorized. Only the Owner can manage or rename team roles." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { roleId, name, description } = body;

    if (!name?.trim()) {
      return NextResponse.json({ error: "Role name is required" }, { status: 400 });
    }

    if (roleId) {
      // Rename / update existing role
      const updated = await prisma.teamRole.update({
        where: { id: roleId },
        data: {
          name: name.trim(),
          description: description?.trim() || null,
        },
      });
      return NextResponse.json({ success: true, role: updated, message: "Role updated" });
    }

    // Create new role
    const created = await prisma.teamRole.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        isDefault: false,
      },
    });

    return NextResponse.json({ success: true, role: created, message: "Role created" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}
