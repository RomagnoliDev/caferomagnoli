import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { ok: false, error: "Email y password son obligatorios" },
        { status: 400 }
      );
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json(
        { ok: false, error: "Ya existe un usuario con ese email" },
        { status: 400 }
      );
    }

    const passwordHash = await hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: "USER",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[API] Error en /api/signup:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Error desconocido" },
      { status: 500 }
    );
  }
}