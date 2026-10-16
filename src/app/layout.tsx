import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";
import { SITE } from "@/lib/site";

const fraunces = localFont({
  src: "../fonts/Fraunces-Variable.ttf",
  variable: "--font-fraunces",
  weight: "100 900",
  display: "swap",
});

const inter = localFont({
  src: "../fonts/Inter-Variable.ttf",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: "Amerta Massage — Jasa Home Massage Profesional di Bali | Canggu & Seminyak",
    template: "%s | Amerta Massage Bali",
  },
  description:
    "Pijat profesional datang ke vila, hotel & rumah Anda di Canggu, Seminyak, Berawa & Kerobokan. Terapis bersertifikat, minyak aromaterapi murni, linen bersih per klien. Pesan via WhatsApp — terapis tiba ±60 menit.",
  keywords: [
    "home massage bali",
    "pijat panggilan bali",
    "pijat ke rumah canggu",
    "massage seminyak",
    "pijat panggilan canggu",
    "jasa pijat bali",
    "balinese home massage",
    "massage therapist bali",
    "pijat vila bali",
    "spa panggilan bali",
  ],
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  alternates: {
    canonical: "/",
    languages: { "id-ID": "/", "en-US": "/" },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: SITE.domain,
    siteName: SITE.legalName,
    title: "Amerta Massage — Jasa Home Massage Profesional di Bali",
    description:
      "Terapis bersertifikat datang ke vila, hotel & rumah Anda di Canggu–Seminyak. Minyak aromaterapi murni, linen bersih per klien. Pesan via WhatsApp, terapis tiba ±60 menit.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Amerta Massage — Jasa Home Massage Profesional di Bali",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amerta Massage — Jasa Home Massage Profesional di Bali",
    description:
      "Pijat profesional datang ke vila & rumah Anda di Canggu–Seminyak. Pesan via WhatsApp, terapis tiba ±60 menit.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "Health & Wellness",
};

export const viewport: Viewport = {
  themeColor: "#0C3B2E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} flex min-h-screen flex-col bg-cream font-sans text-ink antialiased`}
      >
        {children}
        <Toaster position="bottom-center" richColors toastOptions={{ style: { fontFamily: "var(--font-inter)" } }} />
      </body>
    </html>
  );
}
