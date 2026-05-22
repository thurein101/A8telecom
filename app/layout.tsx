import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import "@uploadthing/react/styles.css";
import "./globals.css";
import Nav from "@/components/Nav/Nav";
import FooterCom from "@/components/Footer";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Amara8 Telecom | Engineering Solutions",
  description: "Professional Metro, ODN, FTTH & Power Solutions across Myanmar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        
        <Nav />
        
       
        <main className="flex-1 flex flex-col pt-20">
          {children}
          
        </main>
        <FooterCom/>
      </body>
    </html>
  );
}