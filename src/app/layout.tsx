import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan Manuel Stella Website App",
  description: "Mi website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const lang = 'es'

  return (
    <html lang={lang}
      <body>
        {children}
      </body>
    </html>
  );
}
