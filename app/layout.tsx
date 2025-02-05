import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { ContactFooter } from "./contactFooter/ContactFooter";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Płomień Camp",
  description: "Płomień Camp - obozy siatkarskie dla dzieci i młodzieży",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={montserrat.className}>
        {children}
        <ContactFooter />
        <Analytics />
      </body>
    </html>
  );
}
