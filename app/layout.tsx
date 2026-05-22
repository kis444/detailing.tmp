import type { Metadata } from "next";
import { Montserrat, Teko } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const teko = Teko({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AutoDetail | Premium Car Detailing",
  description: "Luxury auto detailing services. Professional car care for your vehicle.",
  keywords: "car detailing, auto detailing, ceramic coating, paint correction, car wash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${montserrat.variable} ${teko.variable} font-sans antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}