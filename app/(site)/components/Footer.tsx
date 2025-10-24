export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Romagnoli Group. Todos los derechos reservados.</p>
          <p className="opacity-80">Recoleta, CABA — Argentina</p>
        </div>
      </div>
    </footer>
  );
}
