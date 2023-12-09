import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "timetosell - Home",
  description: "Best market signal to sell your big biggy crypto bag.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700" rel="stylesheet" />
      </head>
      <body>
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-ESVVG7ZC46" />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-ESVVG7ZC46');
        `}
          </Script>
        </>
        {children}
      </body>
    </html>
  );
}
