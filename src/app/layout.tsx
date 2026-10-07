import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pack Política: +5 mil cortes para criar conteúdo e buscar suas primeiras vendas",
  description:
    "Pack com mais de 5 mil cortes verticais de política prontos para editar + treinamento completo. Acesso vitalício por link do Google Drive.",
  keywords: [
    "pack política",
    "cortes políticos",
    "conteúdo político",
    "criação de conteúdo",
    "cortes verticais",
    "capcut",
  ],
  authors: [{ name: "Pack Política" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Pack Política: +5 mil cortes para criar conteúdo",
    description:
      "Cortes verticais prontos + treinamento para viralizar, vender cortes e criar infoprodutos.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pack Política",
    description: "+5 mil cortes verticais prontos para editar",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {/* Meta / Facebook Pixel (ID: 900080772936894) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '900080772936894');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=900080772936894&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
