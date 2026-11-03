import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vital Central | Iglesia Vital",
  description: "Un solo lugar. Un solo equipo. Una misma misión."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}