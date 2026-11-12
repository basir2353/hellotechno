import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import { brand } from "@/lib/site";
import { arabic } from "./fonts";
import "./fonts.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hellotecho.example"),
  title: {
    default: "Hello Techo Solutions — AI Customer Experience Platform",
    template: "%s | Hello Techo Solutions",
  },
  description:
    "Hello Techo Solutions is a GCC-first AI customer experience platform for hospitality, clinics, restaurants, bakeries, and growing businesses. English and Arabic native.",
  applicationName: brand.name,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.svg" }],
  },
  openGraph: {
    title: "Hello Techo Solutions — AI Customer Experience Platform",
    description:
      "Governed AI customer experience across WhatsApp, voice, web chat, SMS, Instagram and email. English and Arabic native.",
    siteName: brand.short,
    type: "website",
    images: [{ url: "/og-share.svg", width: 1200, height: 630, alt: brand.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hello Techo Solutions — AI Customer Experience Platform",
    description:
      "Governed AI customer experience across WhatsApp, voice, web chat, SMS, Instagram and email.",
    images: ["/og-share.svg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${arabic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
