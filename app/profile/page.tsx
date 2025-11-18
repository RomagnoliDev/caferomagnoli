import { auth } from "@/auth"; // si usás helper, o usa getServerSession
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await getServerSession();
  if (!session || !session.user) {
    // redirigir a login
    return (
      <div className="max-w-md mx-auto px-6 py-16">
        <p>Necesitás iniciar sesión.</p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: (session.user as any).id },
    include: {
      machines: true,
      orders: true,
      serviceTickets: true,
    },
  });

  if (!user) {
    return <div className="max-w-md mx-auto px-6 py-16">Usuario no encontrado.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-2xl font-semibold mb-4">Mi perfil</h1>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Máquinas en comodato</h2>
        {user.machines.length === 0 && <p className="text-sm text-gray-600">Sin máquinas asignadas.</p>}
        {user.machines.map(m => (
          <div key={m.id} className="border rounded-xl p-3 mb-2">
            <p>Modelo: {m.model}</p>
            <p>Serie: {m.serialNumber}</p>
            <p>Activa: {m.active ? "Sí" : "No"}</p>
          </div>
        ))}
      </div>

      {/* Podés agregar secciones de pedidos, tickets, etc. */}
    </div>
  );
}