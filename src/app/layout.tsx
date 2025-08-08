import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Layouts/Main/Navbar";
import Footer from "./Layouts/Main/Footer";
import ClientThemeProvider from "@/utils/ClientThemeProvider";
import WhatsApp from "@/components/WhatsApp";
import { Analytics } from "@vercel/analytics/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const Sacramento = localFont({
  src: "./fonts/Sacramento-Regular.woff",
  variable: "--font-sacramento",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${Sacramento.variable} antialiased relative`}
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      >
        <ClientThemeProvider>
          <Navbar />
          <WhatsApp />
          {children}
          <Footer />
          <Analytics />
        </ClientThemeProvider>
      </body>
    </html>
  );
}
