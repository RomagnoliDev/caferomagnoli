'use client';
import { useState } from "react";
import Button from "./Button";

export default function ContactForm({ tag }: { tag: "B2C" | "B2B" }) {
  const [status, setStatus] = useState<null | "ok" | "err">(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al enviar el formulario");
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("err");
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input name="nombre" placeholder="Nombre" className="border rounded-xl px-4 py-3" required />
      <input name="email" type="email" placeholder="Email" className="border rounded-xl px-4 py-3" required />
      <input name="telefono" placeholder="Teléfono (opcional)" className="border rounded-xl px-4 py-3" />
      <textarea name="mensaje" placeholder="Contanos qué buscás" className="border rounded-xl px-4 py-3" rows={4} />
      <input type="hidden" name="segmento" value={tag} />
      <Button type="submit">Enviar consulta</Button>
      {status === "ok" && <p className="text-green-700 text-sm">¡Gracias! Te contactaremos a la brevedad.</p>}
    </form>
  );
}
