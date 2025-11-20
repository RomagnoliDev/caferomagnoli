import { Lugrasimo } from "next/font/google";
import type { Metadata } from "next";
import "./../styles/globals.css";

export const metadata: Metadata = {
  title: "Romagnoli Group",
  description: "Café Romagnoli & Toscano Tabaco - Calidad y experiencia con raíz italiana.",
};

const lugrasimo = Lugrasimo({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lugrasimo"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lugrasimo.variable}>
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
