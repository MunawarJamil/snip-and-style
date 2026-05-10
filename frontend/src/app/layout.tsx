import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Snip & Style — Premium Beauty Salon",
    template: "%s | Snip & Style",
  },
  description:
    "An elevated beauty experience for him and her. Book hair, skin, nails, and styling services with master stylists.",
  keywords: [
    "beauty salon",
    "hair salon",
    "men salon",
    "women salon",
    "facial",
    "manicure",
    "pedicure",
    "Pakistan salon",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
