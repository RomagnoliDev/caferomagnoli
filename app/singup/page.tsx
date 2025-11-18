"use client";

import { useState } from "react";
import Button from "../(site)/components/Button";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries()) as any;

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    const json = await res.json();
    if (!res.ok || !json.ok) {
      setError(json.error || "Error al crear usuario");
      return;
    }

    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold mb-4">Crear cuenta</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input name="name" placeholder="Nombre" className="border rounded-xl px-4 py-3" />
        <input name="email" type="email" placeholder="Email" className="border rounded-xl px-4 py-3" required />
        <input name="password" type="password" placeholder="Contraseña" className="border rounded-xl px-4 py-3" required />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit">Registrarme</Button>
      </form>
    </div>
  );
}
