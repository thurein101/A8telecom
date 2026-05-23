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


export const metadata = {
  title: "Amara8 Telecom | Professional Telecom & Engineering Services",
  description: "မြေပြင်လုပ်ငန်းခွင်မှတ်တမ်းများနှင့် အဆင့်မြင့် တယ်လီကွန်း အင်ဂျင်နီယာ ဝန်ဆောင်မှုများ",
  keywords: ["Amara8", "A8", "A8 Telecom", "Telecom Myanmar", "Engineering Services", "Field Operations"],
  robots: {
    index: true, 
    follow: true, 
  },
  verification: {
    google: "FKJKU6a0V2dBhOy4U9nu1BBNo1VT7BN6p_EJrf90o8k",
  },
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