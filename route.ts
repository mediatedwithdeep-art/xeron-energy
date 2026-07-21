import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message } = body ?? {};

    if (!name || !phone) {
      return NextResponse.json(
        { ok: false, error: "Name and phone are required." },
        { status: 400 }
      );
    }

    // Basic sanity checks
    if (typeof phone !== "string" || phone.replace(/\D/g, "").length < 8) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    // In production, forward to CRM / email / WhatsApp Business API here.
    // We log server-side and return success so the UX is fully wired.
    console.info("[xeron:lead]", {
      name,
      phone,
      email: email ?? null,
      message: message ?? null,
      at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please call us directly." },
      { status: 500 }
    );
  }
}
