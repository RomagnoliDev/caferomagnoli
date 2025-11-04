import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[API] Nuevo lead recibido:", body);

    const target = process.env.INTEGRATION_TARGET;
    console.log("[API] INTEGRATION_TARGET:", target);

    if (!target) {
      throw new Error("INTEGRATION_TARGET no configurado");
    }

    // --- EMAILJS ---
    // Sólo informativo: el envío real con EmailJS se hace desde el frontend
    if (target === "emailjs") {
      console.warn(
        "[API] Aviso: EmailJS no se envía desde el servidor (Next.js / Node). " +
          "Debe manejarse desde el frontend usando @emailjs/browser y la clave pública."
      );

      // Respondemos ok para no romper el flujo, pero acá no se llama a EmailJS
      return NextResponse.json(
        { ok: true, message: "EmailJS debe manejarse desde el frontend" },
        { status: 200 }
      );
    }

    // --- GOOGLE SHEETS ---
    if (target === "sheets") {
      const SHEETS_WEBAPP_URL = process.env.SHEETS_WEBAPP_URL;
      if (!SHEETS_WEBAPP_URL) {
        throw new Error("Falta SHEETS_WEBAPP_URL en .env");
      }

      console.log("[API] Enviando datos a Google Sheets...");

      // Enriquecemos el payload antes de mandarlo al Apps Script
      const sheetPayload = {
        ...body,
        origen: body.origen || "web_romagnoli",
        // si no viene ruta desde el frontend, tomamos el referer
        ruta: body.ruta || req.headers.get("referer") || "",
        submitted_at: body.submitted_at || new Date().toISOString(),
      };

      const res = await fetch(SHEETS_WEBAPP_URL, {
        method: "POST",
        body: JSON.stringify(sheetPayload),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(
          `Error al enviar a Sheets (${res.status}): ${await res.text()}`
        );
      }

      console.log("[API] Envío a Google Sheets exitoso");
      return NextResponse.json({ ok: true });
    }

    // --- HUBSPOT ---
    if (target === "hubspot") {
      const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;
      if (!HUBSPOT_API_KEY) {
        throw new Error("Falta HUBSPOT_API_KEY en .env");
      }

      console.log("[API] Enviando datos a HubSpot...");

      const res = await fetch(
        "https://api.hubapi.com/crm/v3/objects/contacts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${HUBSPOT_API_KEY}`,
          },
          body: JSON.stringify({
            properties: {
              email: body.email,
              firstname: body.nombre,
              phone: body.telefono || "",
              message: body.mensaje || "",
              segmento: body.segmento,
              source: "web_romagnoli",
              submitted_at: body.submitted_at || new Date().toISOString(),
            },
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          `Error al enviar a HubSpot (${res.status}): ${await res.text()}`
        );
      }

      console.log("[API] Envío a HubSpot exitoso");
      return NextResponse.json({ ok: true });
    }

    // --- Si el target no coincide ---
    throw new Error(`INTEGRATION_TARGET desconocido: ${target}`);
  } catch (err: any) {
    console.error("[API] Error en /api/lead:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Error desconocido" },
      { status: 500 }
    );
  }
}