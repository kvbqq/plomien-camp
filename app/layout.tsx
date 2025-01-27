import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { Nav } from "./navbar/Nav";
import { ContactFooter } from "./contactFooter/ContactFooter";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Płomień Camp",
  description: "Płomień Camp - obozy siatkarskie dla dzieci i młodzieży",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={montserrat.className}>
        <Nav />
        {children}
        <ContactFooter />
      </body>
    </html>
  );
}
