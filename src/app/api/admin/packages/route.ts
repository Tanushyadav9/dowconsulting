import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthContext } from "@/lib/auth";

/**
 * Admin Packages Management API
 * Server-side protected: Only Owner or authorized Staff can manage packages and pricing.
 */

export async function GET(req: NextRequest) {
  try {
    const auth = await getAuthContext();
    if (!auth.isAuthenticated || (!auth.isOwner && !auth.permissions?.canManageQuotes)) {
      return NextResponse.json({ error: "Unauthorized access to package management" }, { status: 403 });
    }

    const packages = await prisma.package.findMany({
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ packages });
  } catch (error: any) {
    console.error("GET /api/admin/packages error:", error);
    return NextResponse.json({ error: error.message || "Failed to load packages" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const auth = await getAuthContext();
    if (!auth.isAuthenticated || (!auth.isOwner && !auth.permissions?.canManageQuotes)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { slug, name, subtitle, priceINR, priceUSD, inclusions, isPopular, isActive } = body;

    if (!slug || !name || typeof priceINR !== "number" || typeof priceUSD !== "number") {
      return NextResponse.json({ error: "Missing required package fields (slug, name, priceINR, priceUSD)" }, { status: 400 });
    }

    const created = await prisma.package.upsert({
      where: { slug },
      update: {
        name,
        subtitle: subtitle || null,
        priceINR: Math.round(priceINR),
        priceUSD: Math.round(priceUSD),
        inclusions: Array.isArray(inclusions) ? inclusions : [],
        isPopular: Boolean(isPopular),
        isActive: Boolean(isActive),
      },
      create: {
        slug,
        name,
        subtitle: subtitle || null,
        priceINR: Math.round(priceINR),
        priceUSD: Math.round(priceUSD),
        inclusions: Array.isArray(inclusions) ? inclusions : [],
        isPopular: Boolean(isPopular),
        isActive: Boolean(isActive),
      },
    });

    return NextResponse.json({ success: true, package: created });
  } catch (error: any) {
    console.error("POST /api/admin/packages error:", error);
    return NextResponse.json({ error: error.message || "Failed to save package" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const auth = await getAuthContext();
    if (!auth.isAuthenticated || (!auth.isOwner && !auth.permissions?.canManageQuotes)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { id, isActive, name, subtitle, priceINR, priceUSD, inclusions, isPopular } = body;

    if (!id) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (typeof isActive === "boolean") updateData.isActive = isActive;
    if (name) updateData.name = name;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (typeof priceINR === "number") updateData.priceINR = Math.round(priceINR);
    if (typeof priceUSD === "number") updateData.priceUSD = Math.round(priceUSD);
    if (Array.isArray(inclusions)) updateData.inclusions = inclusions;
    if (typeof isPopular === "boolean") updateData.isPopular = isPopular;

    const updated = await prisma.package.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, package: updated });
  } catch (error: any) {
    console.error("PATCH /api/admin/packages error:", error);
    return NextResponse.json({ error: error.message || "Failed to update package" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = await getAuthContext();
    if (!auth.isAuthenticated || !auth.isOwner) {
      return NextResponse.json({ error: "Only the Owner can delete packages" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Package ID is required" }, { status: 400 });
    }

    await prisma.package.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Package removed" });
  } catch (error: any) {
    console.error("DELETE /api/admin/packages error:", error);
    return NextResponse.json({ error: error.message || "Failed to delete package" }, { status: 500 });
  }
}
