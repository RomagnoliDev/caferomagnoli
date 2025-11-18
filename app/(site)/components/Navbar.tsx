import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full sticky top-0 z-40 bg-black/70 backdrop-blur border-black">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold text-white">Romagnoli Group</Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/caferomagnoli" className="text-white">Café Romagnoli</Link>
          <Link href="/toscanotabaco" className="text-white">Toscano Tabaco</Link>
        </div>
      </div>
    </nav>
  );
}
