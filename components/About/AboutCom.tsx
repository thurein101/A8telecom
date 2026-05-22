"use client";

import { motion } from "framer-motion";
import { 
  Building2, 
  MapPin, 
  Users2, 
  CheckSquare, 
  Target, 
  Compass,
  Briefcase
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-slate-950 text-white font-sans antialiased">
      
      {/* 1. CORPORATE INTRO (ကုမ္ပဏီမိတ်ဆက် ဌာန - TEXT CENTER VERSION) */}
      <section className="relative pt-40 pb-28 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/5 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
          
          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs justify-center">
            <Building2 size={14} />
            Company Profile • Amara8 Co., Ltd.
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold mt-6 tracking-tight leading-tight max-w-3xl">
            Connecting Communities with Trusted Infrastructure Services
          </h1>
          
          <p className="text-lg md:text-xl font-bold text-slate-300 mt-3 tracking-wide max-w-2xl">
            စိတ်ချယုံကြည်ရသော ဆက်သွယ်ရေးကွန်ရက်နှင့် အခြေခံအဆောက်အအုံ တည်ဆောက်ရေးလုပ်ငန်း
          </p>

          <p className="text-slate-400 mt-6 text-sm md:text-base leading-relaxed font-normal max-w-2xl">
            Amara8 Co., Ltd. (A8) သည် ၂၀၂၀ ခုနှစ်တွင် စတင်တည်ထောင်ခဲ့ပြီး မြန်မာနိုင်ငံတစ်ဝန်းရှိ မိုဘိုင်းအော်ပရေတာများနှင့် အင်တာနက်ဝန်ဆောင်မှုပေးသည့် (ISP) ကုမ္ပဏီကြီးများအတွက် အရည်အသွေးမြင့် ကွန်ရက်အခြေခံအဆောက်အအုံများ တည်ဆောက်ပေးနေသည့် အင်ဂျင်နီယာလုပ်ငန်းအဖွဲ့အစည်း ဖြစ်ပါသည်။
          </p>
          
        </div>
      </section>

      {/* 2. CORE REGISTRATION & HQ ADDRESS */}
      <section className="py-10 bg-slate-900/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            <div className="bg-slate-950 border border-white/10 rounded-xl p-5 flex items-start gap-4">
              <MapPin className="text-cyan-400 mt-1 shrink-0" size={18} />
              <div className="text-left">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Registered Head Office</span>
                <p className="text-sm font-semibold text-white mt-1 leading-snug">
                  No. 8, Kabar Kyaw Street, Pyithaya Quarter, Pyay, Myanmar.
                </p>
                <span className="text-xs text-slate-400 block mt-0.5">ပြည်မြို့၊ ပြည်သာယာရပ်ကွက်၊ ကမ္ဘာကျော်လမ်း၊ အမှတ် (၈)</span>
              </div>
            </div>

            <div className="bg-slate-950 border border-white/5 rounded-xl p-5 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Establishment</span>
                <p className="text-xl font-extrabold text-cyan-400 mt-0.5">2020</p>
                <span className="text-xs text-slate-400 block mt-0.5">လုပ်ငန်းစတင်တည်ထောင်သည့်နှစ်</span>
              </div>
              <Building2 size={24} className="text-slate-800" />
            </div>

            <div className="bg-slate-950 border border-white/5 rounded-xl p-5 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Workforce Capacity</span>
                <p className="text-xl font-extrabold text-cyan-400 mt-0.5">85 Specialists</p>
                <span className="text-xs text-slate-400 block mt-0.5">စုစုပေါင်းကျွမ်းကျင်လုပ်သားအင်အား</span>
              </div>
              <Users2 size={24} className="text-slate-800" />
            </div>

          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Mission Statement */}
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
              <div className="text-left">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center text-cyan-400 mb-6">
                  <Target size={20} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white">Our Corporate Mission</h2>
                <p className="text-xs text-cyan-400/90 font-medium mt-0.5">ကုမ္ပဏီ၏ ရည်မှန်းချက်တာဝန်</p>
                
                <p className="text-slate-300 text-sm leading-relaxed mt-6 font-normal">
                  မြို့ပြဒေသများနည်းတူ အရည်အသွေးပြည့်ဝသော ဆက်သွယ်ရေးနည်းပညာနှင့် အခြေခံအဆောက်အအုံများကို ဒေသတွင်းကျေးလက်ဒေသများအထိ အချိုးညီညီ ဖြန့်ကြက်တပ်ဆင်ပေးခြင်းဖြင့် လူမှုစီးပွားဘဝနှင့် ဒေသတွင်းဖွံ့ဖြိုးတိုးတက်မှုကို အထောက်အကူပြုစေရန် ဖြစ်ပါသည်။
                </p>
              </div>
            </div>

            {/* Core Values / Operational Vision */}
            <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 flex flex-col justify-between">
              <div className="text-left">
                <div className="w-10 h-10 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center text-cyan-400 mb-6">
                  <Compass size={20} />
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white">Operational Vision</h2>
                <p className="text-xs text-cyan-400/90 font-medium mt-0.5">လုပ်ငန်းဆိုင်ရာ မျှော်မှန်းချက်</p>
                
                <p className="text-slate-300 text-sm leading-relaxed mt-6 font-normal">
                  လုပ်ငန်းအပ်နှံသူ လုပ်ဖော်ကိုင်ဖက်များနှင့်အတူ ရေရှည်ခိုင်မြဲသော ယုံကြည်မှုကို တည်ဆောက်ပြီး၊ နည်းပညာစံနှုန်းများနှင့်အညီ တိကျသေჩာသော မြေပြင်ကွင်းဆင်းအင်ဂျင်နီယာ လုပ်ငန်းများကို မြန်မာနိုင်ငံတစ်ဝန်း အကောင်းဆုံးဝန်ဆောင်မှုပေးနိုင်ရန် မျှော်မှန်းပါသည်။
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ON-GROUND TEAM ALLOCATION */}
      <section className="py-20 bg-slate-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="mb-14 text-left">
            <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">Operational Distribution</span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1">
              On-Ground Resources & Project Fleet
            </h2>
            <p className="text-xs text-slate-400 mt-1">မြေပြင်ကွင်းဆင်းအင်ဂျင်နီယာအဖွဲ့များနှင့် လုပ်ငန်းသုံးယာဉ်စုဖွဲ့မှု</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            
            <div className="bg-slate-950 p-6 rounded-xl border border-white/5 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 mb-3">
                  <Briefcase size={16} />
                  <h3 className="text-sm font-bold text-white">Project Site Management</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-normal">
                  လုပ်ငန်းခွင်တစ်ခုချင်းစီအလိုက် လုပ်ငန်းအရည်အသွေး စံချိန်စံညွှန်းကို အနီးကပ်ကြီးကြပ်ကွပ်ကဲရန်အတွက် Project Engineers များနှင့် Site Engineers များ စနစ်တကျ တာဝန်ယူဆောင်ရွက်နေပါသည်။
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-500 font-mono">
                MANAGEMENT & QA COMPLIANCE
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-white/5 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 mb-3">
                  <CheckSquare size={16} />
                  <h3 className="text-sm font-bold text-white">Maintenance Teams</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-normal">
                  ဆက်သွယ်ရေးလိုင်းများ စဉ်ဆက်မပြတ်အဆင်ပြေစေရန်အတွက် အရေးပေါ်ပြုပြင်ထိန်းသိမ်းရေး အဖွဲ့ခွဲများ (Maintenance Teams) စုဖွဲ့ထားရှိပြီး ကွင်းဆင်းနည်းပညာရှင်များနှင့် ပံ့ပိုးပေးထားပါသည်။
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-500 font-mono">
                24/7 NETWORK OPERATIONS
              </div>
            </div>

            <div className="bg-slate-950 p-6 rounded-xl border border-white/5 flex flex-col justify-between text-left">
              <div>
                <div className="flex items-center gap-2 text-cyan-400 mb-3">
                  <Building2 size={16} />
                  <h3 className="text-sm font-bold text-white">Logistics Fleet Support</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-normal">
                  တိုင်းဒေသကြီးအသီးသီးရှိ မြို့နယ်ကွန်ရက်ဖြန့်ကြက်မှု လုပ်ငန်းခွင်များဆီသို့ လိုအပ်သော စက်ပစ္စည်းကိရိယာများနှင့် လူအင်အားကို အချိန်မီ dispatch လုပ်နိုင်ရန် ကိုယ်ပိုင်လုပ်ငန်းသုံးမော်တော်ယာဉ်များဖြင့် ဖွဲ့စည်းထားပါသည်။
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 text-xs text-slate-500 font-mono">
                SELF-OWNED DEPLOYMENT FLEET
              </div>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}