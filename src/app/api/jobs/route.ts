import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(jobs);
}

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*", // or restrict to 'https://www.upwork.com'
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const job = await prisma.job.create({
      data: {
        company: body.company,
        position: body.position,
        status: body.status,
        link: body.link,
        notes: body.notes,
      },
    });
    return NextResponse.json(job, {
      headers: {
        "Access-Control-Allow-Origin": "*", // or restrict to 'https://www.upwork.com'
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
