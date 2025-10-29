import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { nombre, email, telefono?, mensaje?, segmento: "B2C"|"B2B" }

    const target = process.env.INTEGRATION_TARGET; // "emailjs" | "sheets" | "hubspot"
    if (!target) throw new Error("INTEGRATION_TARGET no configurado");

    if (target === "emailjs") {
      const r = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID,
          template_id: process.env.EMAILJS_TEMPLATE_ID,
          user_id: process.env.EMAILJS_PUBLIC_KEY, // clave pública
          template_params: {
            nombre: body.nombre,
            email: body.email,
            telefono: body.telefono || "",
            mensaje: body.mensaje || "",
            segmento: body.segmento,
            // extra
            submitted_at: new Date().toISOString(),
          },
        }),
      });
      if (!r.ok) throw new Error("EmailJS respondió con error");
      return NextResponse.json({ ok: true });
    }

    if (target === "sheets") {
      // Reenvía al Web App de Google Apps Script (ver sección 2)
      const r = await fetch(process.env.SHEETS_WEBAPP_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!r.ok) throw new Error("Sheets WebApp respondió con error");
      return NextResponse.json({ ok: true });
    }

    if (target === "hubspot") {
      const token = process.env.HUBSPOT_TOKEN!;
      // 1) Crear/actualizar contacto
      const contactRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          properties: {
            email: body.email,
            firstname: body.nombre,
            phone: body.telefono || "",
            segmento: body.segmento,
            mensaje: body.mensaje || "",
            source: "web_romagnoli",
            submitted_at: new Date().toISOString(),
          },
        }),
      });

      // Si ya existe, intentar update por email (respuesta 409)
      if (contactRes.status === 409) {
        await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(body.email)}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            properties: {
              phone: body.telefono || "",
              segmento: body.segmento,
              mensaje: body.mensaje || "",
            },
          }),
        });
      } else if (!contactRes.ok) {
        throw new Error("Error creando contacto en HubSpot");
      }

      // 2) (Opcional) Crear nota/actividad
      await fetch("https://api.hubapi.com/crm/v3/objects/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          properties: {
            hs_note_body: `Nuevo lead ${body.segmento} desde web:\n${body.nombre} <${body.email}>\n${body.telefono || ""}\n\n${body.mensaje || ""}`,
          },
        }),
      });

      return NextResponse.json({ ok: true });
    }

    throw new Error(`INTEGRATION_TARGET no soportado: ${target}`);
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}