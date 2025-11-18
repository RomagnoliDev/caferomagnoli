'use client';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-azure border-t">
      <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {year} Romagnoli Group. Todos los derechos reservados.</p>
          <p className="opacity-80">Recoleta, CABA - Argentina</p>
        </div>
      </div>
    </footer>
  );
}
