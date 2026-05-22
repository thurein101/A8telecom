"use client";

import { motion } from "framer-motion";
import { 
  Network, 
  Cable, 
  Zap, 
  DraftingCompass, 
  TowerControl, 
  Cpu, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  ShieldCheck,
  Check,
  Code2 // 💡 Web Development အတွက် Icon အသစ် ထည့်သွင်းခြင်း
} from "lucide-react";

const services = [
  {
    title: "Metro & ODN Construction and Maintenance",
    titleMm: "မက်ထရိုနှင့် ODN ကွန်ရက် တည်ဆောက်ပြုပြင်ထိန်းသိမ်းခြင်းလုပ်ငန်း",
    description: "Complete structural deployment and continuous maintenance of fiber optic metro backbones and Optical Distribution Networks (ODN) engineered for large-scale operators.",
    capabilities: [
      "Backbone Fiber Ring Architecture (ပင်မဖိုင်ဘာကွင်းဆက်စနစ်)",
      "ODN Node Optimization (ကွန်ရက်ခွဲဝေမှုစနစ် အဆင့်မြှင့်တင်ခြင်း)",
      "Emergency Fiber Cut Maintenance (အရေးပေါ် ဖိုင်ဘာကြိုးပြတ်တောက်မှု ပြုပြင်ခြင်း)"
    ],
    icon: Network,
  },
  {
    title: "FTTH Installation and Maintenance",
    titleMm: "FTTH လိုင်းတပ်ဆင်ခြင်းနှင့် ရေရှည်ထိန်းသိမ်းခြင်းလုပ်ငန်း",
    description: "Turnkey Fiber-to-the-Home (FTTH) high-density line installation, subscriber drop connections, and persistent client-side engineering maintenance support.",
    capabilities: [
      "High-Density Drop Connections (လူနေအိမ်သုံး ဖိုင်ဘာလိုင်းချိတ်ဆက်ခြင်း)",
      "Last-Mile Distribution Setup (နောက်ဆုံးမိုင် ကွန်ရက်ဖြန့်ကြက်ခြင်း)",
      "On-Call Field Troubleshooting Teams (ကွင်းဆင်း ပြုပြင်ထိန်းသိမ်းရေးအဖွဲ့များ)"
    ],
    icon: Cable,
  },
  {
    title: "Telecom Power Solutions",
    titleMm: "ဆက်သွယ်ရေးပါဝါနှင့် အရန်လျှပ်စစ်စနစ် ဖြေရှင်းချက်များ",
    description: "Professional setup, deployment, and structural alignment of telecom industrial backup power solutions, generators, and distribution networks.",
    capabilities: [
      "DC Power Plant Assemblies (ဒီစီပါဝါစနစ် တပ်ဆင်ခြင်း)",
      "Industrial Battery Backup Storage (စက်မှုသုံး အရန်ဘက်ထရီစနစ်)",
      "Hybrid Power Systems Monitoring (ဟိုက်ဘရစ် ပါဝါစနစ်စောင့်ကြည့်ခြင်း)"
    ],
    icon: Zap,
  },
  {
    title: "Survey Design and Estimation",
    titleMm: "ကွင်းဆင်းတိုင်းတာခြင်း၊ ဒီဇိုင်းထုတ်ခြင်းနှင့် ကုန်ကျစရိတ်တွက်ချက်ခြင်း",
    description: "High-accuracy geographical telecom route mapping, structural layout designs, and strict financial estimations for efficient network optimization.",
    capabilities: [
      "GIS Route Mapping & Field Scans (မြေပြင်လမ်းကြောင်း တိုင်းတာရေးဆွဲခြင်း)",
      "BOQ & Detailed Cost Estimation (တိကျသော ကုန်ကျစရိတ်တွက်ချက်မှုစာရင်း)",
      "Feasibility Engineering Assessments (လုပ်ငန်းဖြစ်မြောက်နိုင်စွမ်း ဆန်းစစ်ခြင်း)"
    ],
    icon: DraftingCompass,
  },
  {
    title: "Concrete Pole Installation",
    titleMm: "ကွန်ကရစ်တိုင်စိုက်ထူခြင်းနှင့် အထက်လိုင်းအခြေခံအဆောက်အအုံလုပ်ငန်း",
    description: "Heavy-duty concrete pole deployment, overhead line structural anchoring, and secure cabling arrays managed by experienced physical crews.",
    capabilities: [
      "Overhead Infrastructure Setup (အထက်လိုင်း အခြေခံအဆောက်အအုံ တည်ဆောက်ခြင်း)",
      "Line Tension & Physical Safety Audits (ကြိုးတင်းအားနှင့် ဘေးကင်းလုံခြုံမှုစစ်ဆေးခြင်း)",
      "Township Permissions Technical Support (မြို့နယ်အာဏာပိုင်ဆိုင်ရာ နည်းပညာပံ့ပိုးမှု)"
    ],
    icon: TowerControl,
  },
  {
    title: "M&E Support Services",
    titleMm: "စက်မှုနှင့် လျှပ်စစ်အင်ဂျင်နီယာဆိုင်ရာ ပံ့ပိုးမှုဝန်ဆောင်မှုလုပ်ငန်းများ",
    description: "Critical mechanical and electrical infrastructure support setups, including server-room precision climate cooling, ELV integration, and safety arrays.",
    capabilities: [
      "Precision Server Room Aircon (PAC) (ဆာဗာခန်းသုံး အအေးပေးစနစ်)",
      "ELV Systems Integration (ဗို့အားနိမ့် လျှပ်စစ်စနစ်များ ချိတ်ဆက်ခြင်း)",
      "Fire Suppression System Support (မီးငြှိမ်းသတ်မှုစနစ် လိုအပ်ချက်များ)"
    ],
    icon: Cpu,
  },
  // 🌟 ၇ ခုမြောက် ဝန်ဆောင်မှုအဖြစ် NEXT.JS WEB SOLUTIONS အား ထည့်သွင်းခြင်း
  {
    title: "Next.js Enterprise Web Solutions",
    titleMm: "လုပ်ငန်းသုံး ခေတ်မီ Website နှင့်  စနစ်များ ဖန်တီးခြင်း",
    description: "Architecting modern, ultra-fast web software, robust internal tooling, corporate identity portals, and optimized dynamic CMS dashboards backed by Next.js.",
    capabilities: [
      "Corporate Platform & Dynamic CMS (ကော်ပိုရိတ်ဝဘ်ဆိုဒ်နှင့် အချက်အလက်စီမံခန့်ခွဲမှုစနစ်)",
      "Highly Optimized SEO & Core Web Vitals (ရှာဖွေမှုစနစ်တွင် ထိပ်ဆုံး၌ပေါ်စေရန် ပြုလုပ်ခြင်း)",
      "Secure Server-Side API Integrations (စိတ်ချရသော ဆာဗာအခြေပြု နည်းပညာချိတ်ဆက်မှုများ)"
    ],
    icon: Code2,
  }
];

export default function ServicesCom() {
  return (
    <main className="bg-slate-950 text-white font-sans antialiased">
      
      {/* 1. CORPORATE B2B HEADER BLOCK */}
      <section className="relative pt-40 pb-24 border-b border-white/10 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs">
            <Building2 size={14} />
            Amara8 Company Limited • Business Services
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 tracking-tight max-w-4xl leading-tight">
            Our Core Engineering Services & Capabilities
          </h1>
          <p className="text-xl font-bold text-slate-300 mt-2 tracking-wide font-sans">
            အဓိက ဆက်သွယ်ရေးနှင့် အင်ဂျင်နီယာ ဝန်ဆောင်မှု လုပ်ငန်းများ
          </p>
          
          <p className="text-slate-400 mt-6 max-w-3xl text-sm md:text-base leading-relaxed font-normal">
            Since 2020, A8 Co., Ltd. has delivered professional telecommunications, specialized layout installations, and engineering infrastructure operations. We fully support corporate network operations, ISPs, and primary developers across Myanmar.
          </p>
        </div>
      </section>

      {/* 2. CORE STRATEGIC SERVICE GRID */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Grid Layout အား ကတ် ၇ ခုစလုံး လှပစေရန် ညှိပေးထားပါသည် */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-slate-900/50 rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:bg-slate-900 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/5 transition duration-300 group"
                >
                  <div>
                    {/* Clean Corporate Icon Badge */}
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center text-cyan-400 mb-6 shadow-inner group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all duration-300">
                      <IconComponent size={22} />
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-white leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-xs font-semibold text-cyan-400/90 mt-1.5 mb-4">
                      {service.titleMm}
                    </p>

                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Rigid Technical Capability Checklists */}
                  <div className="pt-5 border-t border-white/5 mt-auto">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-3 font-semibold">Technical Breakdown / လုပ်ငန်းခွဲများ:</span>
                    <ul className="space-y-2.5">
                      {service.capabilities.map((capability, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-normal leading-tight">
                          <CheckCircle2 size={13} className="text-cyan-500 mt-0.5 shrink-0" />
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CAPACITIES & REGIONAL LOGISTICS ANCHOR */}
      <section className="py-20 bg-slate-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            
            <div className="lg:col-span-1">
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">Operational Capacity</span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-2">
                Proven Track Record & Local Infrastructure
              </h2>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-4 font-normal">
                Our operations ensure consistent, urban-grade communication infrastructure across all assigned regional hubs, backed by a strong commitment to quality and technical accuracy.
              </p>
              
              {/* Regional Footprint Badges */}
              <div className="mt-6 flex flex-col gap-3">
                <div className="bg-slate-950 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                  <MapPin className="text-cyan-400 shrink-0" size={18} />
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Active Working Hubs</span>
                    <span className="text-sm font-bold text-white">Pyay • Myaungmya • Taunggyi</span>
                  </div>
                </div>
                <div className="bg-slate-950 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                  <ShieldCheck className="text-cyan-400 shrink-0" size={18} />
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Resource Capacity</span>
                    <span className="text-sm font-bold text-white">85+ Active Technical Force</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Flat Corporate Asset Statements */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6 font-sans">
              <div className="bg-slate-950/40 p-5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-3 text-cyan-400">
                  <Check size={16} />
                  <h4 className="text-sm font-bold text-white">Professional Logistical Assets</h4>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-normal">
                  Equipped with dedicated, self-owned corporate engineering vehicles, heavy utility setups, fusion splicers, and OTDR testing lines ready for fast regional deployment.
                </p>
              </div>

              <div className="bg-slate-950/40 p-5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-3 text-cyan-400">
                  <Check size={16} />
                  <h4 className="text-sm font-bold text-white">On-Ground Supervisory Teams</h4>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-normal">
                  All active operations are continuously monitored on site by assigned Project Managers, Field Engineers, and dedicated Quality Assurance inspectors.
                </p>
              </div>

              <div className="bg-slate-950/40 p-5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-3 text-cyan-400">
                  <Check size={16} />
                  <h4 className="text-sm font-bold text-white">Accountability Logs</h4>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-normal">
                  Every link layout and termination node is systematically validated for decibel strength loss, producing clean structural data logs handed over to the client.
                </p>
              </div>

              <div className="bg-slate-950/40 p-5 rounded-xl border border-white/5">
                <div className="flex items-center gap-2 mb-3 text-cyan-400">
                  <Check size={16} />
                  <h4 className="text-sm font-bold text-white">Community & Regional Growth</h4>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed font-normal">
                  We invest deeply in local training networks, hiring field support crews directly from communities near our deployment sectors to create economic growth.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}