"use client";

import { useState, useEffect } from "react"; 
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Code2, 
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function FooterCom() {
  const [currentYear, setCurrentYear] = useState<number | string>("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-slate-950 text-white font-sans border-t border-white/5 pt-16 pb-8 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP LAYOUT: COMPANY INFO & ADDRESS */}
        {/* 🛠️ Mobile မှာပါ text-left ကို သေချာထိန်းပေးထားပြီး grid စနစ်ကို ပိုမိုကျယ်ပြန့်စေပါတယ် */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-white/5 text-left">
          
          {/* 1. CORPORATE & MYANMAR INSPIRATIONAL QUOTE (6 Columns) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold tracking-wider text-xs">
              <Building2 size={14} />
              <span>AMARA8 CO., LTD.</span>
            </div>
            
            <blockquote className="border-l-2 border-cyan-500 pl-4 space-y-1.5">
              <p className="text-sm md:text-base font-medium text-slate-200 tracking-wide leading-relaxed italic">
                "နည်းပညာဖြင့် ကွန်ရက်ချိတ်ဆက်မှုကို ဆန်းသစ်ပြီး၊ ဒေသတွင်းစီးပွားရေးနှင့် လူမှုဘဝများကို ပိုမိုဖွံ့ဖြိုးတိုးတက်စေရမည်।"
              </p>
              <p className="text-[11px] text-slate-500 font-normal leading-normal">
                ကျေးလက်နှင့် မြို့ပြ ကွာဟချက်မရှိစေဘဲ အရည်အသွေးမြင့် ဆက်သွယ်ရေးနည်းပညာစနစ်များ အရောက်အပေါက် တည်ဆောက်ပေးနိုင်ရန် ရည်ရွယ်သည်။ 
              </p>
            </blockquote>
          </div>

          {/* 2. MINIMALIST HQ ADDRESS & PHONE (6 Columns) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Address Details */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Registered Address</span>
              <div className="flex items-start gap-2 text-xs md:text-sm text-slate-300 leading-relaxed">
                <MapPin size={15} className="text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">No.8, Kabar Kyaw Street,</p>
                  <p>Pyithaya Quarter, Pyay, Myanmar.</p> 
                  <span className="text-[10px] text-slate-500 block mt-0.5">ပြည်မြို့၊ ပြည်သာယာရပ်ကွက်</span>
                </div>
              </div>
            </div>

            {/* Hotline Details */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Communications</span>
              <div className="space-y-2 text-xs md:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-cyan-400 shrink-0" />
                  <p className="font-medium tracking-wide hover:text-cyan-400 transition-colors cursor-pointer">
                    +95 9 987 654 321
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-cyan-400 shrink-0" />
                  <Link href="mailto:info@amara8.com" className="hover:text-cyan-400 transition-colors text-slate-400">
                    info@amara8.com
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM SECTION: COPYRIGHT & DEVELOPER PORTFOLIO LINK */}
        {/* 🛠️ flex-row ကို Mobile မှာပါ ထိန်းထားပြီး ဘယ်နဲ့ညာ တဖက်စီ အချိုးကျ ခွဲထုတ်လိုက်ပါတယ် */}
        <div className="pt-8 flex flex-row items-center justify-between gap-4 text-[11px] md:text-xs font-sans text-slate-500 text-left">
          
          {/* Copyright Metadata (ဘယ်ဘက်ခြမ်း) */}
          <div className="font-normal pr-2">
            &copy; {currentYear || "2026"} <span className="text-slate-400 font-semibold block sm:inline">Amara8 Co., Ltd.</span> <span className="hidden sm:inline">All rights reserved.</span>
          </div>

          {/* 3. CONTACT TO DEVELOPER CREDITS (ညာဘက်ခြမ်း) */}
          <div className="flex items-center shrink-0">
            <Link 
              href="https://thurein-portfolio-nplg.vercel.app/" 
              className="group flex items-center gap-2 bg-slate-900/60 hover:bg-slate-900 border border-white/5 hover:border-cyan-500/30 rounded-xl px-2.5 py-1.5 md:px-3.5 md:py-2 transition-all duration-300"
            >
              <div className="w-5 h-5 rounded-md bg-slate-950 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:text-cyan-300">
                <Code2 size={11} />
              </div>
              <div className="leading-none text-left">
                <span className="text-[8px] md:text-[9px] font-mono text-slate-500 block font-bold uppercase tracking-wider group-hover:text-slate-400 transition-colors">Crafted By</span>
                <span className="text-[10px] md:text-[11px] font-semibold text-slate-300 group-hover:text-cyan-400 transition-colors flex items-center gap-0.5">
                  Portfolio
                  <ExternalLink size={9} className="opacity-40 group-hover:opacity-100 transition-opacity ml-0.5" />
                </span>
              </div>
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}