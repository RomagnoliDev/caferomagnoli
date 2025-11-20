import type { Metadata } from "next";
import "./../styles/globals.css";
import { Lugrasimo } from "next/font/google";

export const metadata: Metadata = {
  title: "Romagnoli Group",
  description: "Café Romagnoli & Toscano Tabaco - Plan Alfa Fase 1",
};
const lugrasimo = Lugrasimo({
  subsets: ["latin"],
  weight: "400", // Kings solo tiene un peso
  variable: "--font-lugrasimo"

});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={lugrasimo.className}>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
