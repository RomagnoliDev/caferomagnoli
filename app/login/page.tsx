"use client";

import { useState } from "react";
import Button from "../(site)/components/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries()) as any;

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (res?.error) {
      setError("Credenciales inválidas");
      return;
    }

    router.push("/profile");
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold mb-4">Iniciar sesión</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input name="email" type="email" placeholder="Email" className="border rounded-xl px-4 py-3" required />
        <input name="password" type="password" placeholder="Contraseña" className="border rounded-xl px-4 py-3" required />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit">Ingresar</Button>
      </form>
    </div>
  );
}

