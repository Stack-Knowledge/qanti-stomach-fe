import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import { cn } from "@/lib/utils";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "지금 내 뱃속은",
  description:
    "지금 내 뱃속은 서비스는 사용자의 위 용적량을 계산하여 최적화된 위 분포와 피드백을 제공합니다.",
  robots: "index, follow",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["뱃속", "용적량", "연구", "소화", "소화불량", "위", "안주"],
  metadataBase: new URL("https://qanti-stomach.netlify.app"),
  applicationName: "지금 내 뱃속은",
  openGraph: {
    title: "지금 내 뱃속은",
    description:
      "지금 내 뱃속은 서비스는 사용자의 위 용적량을 계산하여 최적화된 위 분포와 피드백을 제공합니다.",
    url: "https://qanti-stomach.netlify.app",
    siteName: "지금 내 뱃속은",
    locale: "ko",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <Script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body
        className={cn(
          inter.className,
          "flex",
          "flex-col",
          "items-center",
          "bg-neutral-950",
          "text-neutral-100",
          "min-h-[100dvh]",
          "relative"
        )}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0.02), transparent)",
          }}
        />
        {/* Providers for state management */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
