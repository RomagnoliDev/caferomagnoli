'use client';
import { useState } from "react";
import Button from "./Button";
import emailjs from "@emailjs/browser";

export default function ContactForm({ tag }: { tag: "B2C" | "B2B" }) {
  const [status, setStatus] = useState<null | "ok" | "err">(null);
  const [loading, setLoading] = useState(false);

  type FormValues = {
    nombre: string;
    email: string;
    telefono?: string;
    mensaje?: string;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries()) as FormValues;
    setLoading(true);
    setStatus(null);

    // Payload común para ambos destinos
    const payload = {
      ...data,
      segmento: tag,
      submitted_at: new Date().toISOString(),
    };

    try {
      // ------------------------------
      // 1️⃣ Envío por EMAILJS (frontend)
      // ------------------------------
      const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      const emailPromise = emailjs.send(
        serviceID,
        templateID,
        {
          nombre: payload.nombre,
          email: payload.email,
          telefono: payload.telefono || "",
          mensaje: payload.mensaje || "",
          segmento: payload.segmento,
          submitted_at: payload.submitted_at,
        },
        publicKey
      );

      // ------------------------------
      // 2️⃣ Envío al backend (/api/lead → Google Sheets)
      // ------------------------------
      const apiPromise = fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Ejecutamos ambas en paralelo
      const [emailRes, apiRes] = await Promise.allSettled([
        emailPromise,
        apiPromise,
      ]);

      // Verificamos resultados
      const emailOK = emailRes.status === "fulfilled";
      const apiOK =
        apiRes.status === "fulfilled" && (apiRes.value as Response).ok;

      console.log("[FORM] EmailJS:", emailOK ? "ok" : "error");
      console.log("[FORM] Sheets/API:", apiOK ? "ok" : "error");

      if (!emailOK && !apiOK) {
        throw new Error("Fallaron EmailJS y Sheets simultáneamente");
      }

      form.reset();
      setStatus("ok");
    } catch (err) {
      console.error("[FORM] Error al enviar:", err);
      setStatus("err");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input
        name="nombre"
        placeholder="Nombre"
        className="border rounded-xl px-4 py-3"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border rounded-xl px-4 py-3"
        required
      />
      <input
        name="telefono"
        placeholder="Teléfono (opcional)"
        className="border rounded-xl px-4 py-3"
      />
      <textarea
        name="mensaje"
        placeholder="Contanos qué buscás"
        className="border rounded-xl px-4 py-3"
        rows={4}
      />
      <input type="hidden" name="segmento" value={tag} />
      <Button type="submit" disabled={loading}>
        {loading ? "Enviando..." : "Enviar consulta"}
      </Button>
      {status === "ok" && (
        <p className="text-green-700 text-sm">
          ¡Gracias! Tu mensaje fue enviado correctamente.
        </p>
      )}
      {status === "err" && (
        <p className="text-red-600 text-sm">
          Hubo un problema al enviar. Intentá nuevamente.
        </p>
      )}
    </form>
  );
}