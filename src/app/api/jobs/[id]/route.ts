import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();

    const updated = await prisma.job.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("PATCH error", err);
    return NextResponse.json(
      { error: "Failed to update job" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await prisma.job.delete({
      where: { id: params.id },
    });
    return NextResponse.json(deleted);
  } catch (err) {
    console.error("DELETE error", err);
    return NextResponse.json(
      { error: "Failed to delete job" },
      { status: 500 }
    );
  }
}
