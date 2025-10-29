'use client';
import { useState } from "react";
import Button from "./Button";
import emailjs from "@emailjs/browser";

export default function ContactForm({ tag }: { tag: "B2C" | "B2B" }) {
  const [status, setStatus] = useState<null | "ok" | "err">(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());
    setLoading(true);
    setStatus(null);

    try {
      // Detecta el modo de integración desde variables públicas
      const integrationTarget = process.env.NEXT_PUBLIC_INTEGRATION_TARGET || "emailjs";

      if (integrationTarget === "emailjs") {
        // --- Envío directo desde el frontend usando emailjs-browser ---
        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

        if (!serviceID || !templateID || !publicKey) {
          throw new Error("Faltan variables de entorno de EmailJS");
        }

        await emailjs.send(serviceID, templateID, {
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono || "",
          mensaje: data.mensaje || "",
          segmento: tag,
          submitted_at: new Date().toISOString(),
        }, publicKey);

        console.log("[FORM] EmailJS envío exitoso desde el frontend");
      } else {
        // --- Otros targets: se envía al backend /api/lead ---
        const res = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, segmento: tag }),
        });

        if (!res.ok) throw new Error("Error al enviar al backend");
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
          ¡Gracias! Te contactaremos a la brevedad.
        </p>
      )}
      {status === "err" && (
        <p className="text-red-600 text-sm">
          Hubo un error al enviar. Por favor, intentá nuevamente.
        </p>
      )}
    </form>
  );
}
