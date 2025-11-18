import type { Metadata } from "next";
import "./../styles/globals.css";

export const metadata: Metadata = {
  title: "Romagnoli Group",
  description: "Café Romagnoli & Toscano Tabaco - Plan Alfa Fase 1",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
