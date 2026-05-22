"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import image1 from "@/public/1.png";
import image2 from "@/public/2.png";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Building2,
  Users,
  MapPin,
  Truck,
  Code2,
} from "lucide-react";

const slides = [
  {
    id: 1,
    subTitle: "Amara8 Company Limited • Telecommunication Infrastructure",
    title: "Building Myanmar's Telecom Infrastructure",
    titleMm: "မြန်မာ့ဆက်သွယ်ရေး ကွန်ရက်အခြေခံအဆောက်အအုံ တည်ဆောက်ရေး",
    description:
      "Turnkey engineering deployments for Metro Backbones, ODN networks, and industrial power matrices engineered for continuous availability.",
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    subTitle: "Turnkey Regional Network Deployment",
    title: "Reliable FTTH Installation & Maintenance",
    titleMm: "စိတ်ချရသော FTTH လိုင်းတပ်ဆင်ခြင်းနှင့် ရေရှည်ထိန်းသိမ်းခြင်း လုပ်ငန်းများ",
    description:
      "Providing stable last-mile customer drops, high-density line layouts, and active on-call field support squads across major townships.",
    image:
      "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    subTitle: "Engineering Excellence Since 2020",
    title: "Trusted Telecom Engineering Partner",
    titleMm: "ယုံကြည်စိတ်ချရသော ဆက်သွယ်ရေးအင်ဂျင်နီယာလုပ်ငန်း အဖော်အဖက်",
    description:
      "Bringing urban-grade communication network quality directly to regional communities and rural areas to support economic development.",
    image:
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function HeroCom() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    resetTimer();
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    resetTimer();
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current]);

  return (
    <div className="bg-slate-950 overflow-hidden font-sans antialiased">
      
      {/* SECTION 1: MAIN SLIDER HERO */}
      <section className="relative h-[65vh] md:h-[75vh] w-full select-none border-b border-white/5">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            <div className="absolute inset-0 bg-slate-950">
              <motion.img
                initial={{ scale: 1.01 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                src={slides[current].image}
                alt={slides[current].title}
                className="w-full h-full object-cover opacity-75 brightness-[1.1] contrast-[1.02]"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 via-transparent to-transparent z-10" />

            {/* Content Display */}
            <div className="absolute inset-0 flex items-center z-20 pt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div 
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                
                  className="w-full md:max-w-3xl bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-2xl p-5 md:p-6 shadow-2xl text-left"
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-2 font-bold"
                  >
                    <Building2 size={12} />
                    {slides[current].subTitle}
                  </motion.div>

                  <motion.h1 
                    className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tight leading-tight"
                  >
                    {slides[current].title}
                  </motion.h1>
                  
                  <motion.p 
                    className="mt-1 text-xs md:text-base font-bold text-cyan-300/90 tracking-wide"
                  >
                    {slides[current].titleMm}
                  </motion.p>

                  {/* 🛠️ line-clamp-2 ကို ဖယ်ရှားပြီး max-w-2xl သို့ တိုးမြှင့်ကာ စာသားပြတ်မသွားဘဲ သဘာဝအတိုင်း ဆင်းသွားစေပါတယ် */}
                  <motion.p 
                    className="mt-2 text-[11px] md:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal opacity-90"
                  >
                    {slides[current].description}
                  </motion.p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Control Buttons */}
        <div className="absolute bottom-6 right-6 md:right-10 flex gap-3 z-30">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-lg border border-white/10 bg-slate-900/60 hover:bg-slate-800 transition text-white flex items-center justify-center"
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-lg border border-white/10 bg-slate-900/60 hover:bg-slate-800 transition text-white flex items-center justify-center"
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Flat Horizontal Slide Counter */}
        <div className="absolute bottom-6 left-6 md:left-10 flex items-center gap-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="py-2 focus:outline-none"
              aria-label={`Maps to index item ${index + 1}`}
            >
              <div
                className={`h-1 rounded-full transition-all duration-300 ${
                  current === index ? "w-8 bg-cyan-500" : "w-3 bg-white/20"
                }`}
              />
            </button>
          ))}
        </div>
      </section>


      <section className="relative z-30 bg-slate-900 border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 items-center">
            
            <div className="flex items-center gap-4 p-4 border border-white/5 bg-slate-950/40 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                <MapPin size={18} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] font-mono tracking-wider text-slate-500 uppercase truncate">Operational Hubs</h4>
                <p className="text-sm font-bold text-white mt-0.5 truncate">Pyay • Myaungmya • Taunggyi</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border border-white/5 bg-slate-950/40 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                <Users size={18} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] font-mono tracking-wider text-slate-500 uppercase truncate">Technical Workforce</h4>
                <p className="text-sm font-bold text-white mt-0.5 truncate">85+ Professional Personnel</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border border-white/5 bg-slate-950/40 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                <Truck size={18} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] font-mono tracking-wider text-slate-500 uppercase truncate">Logistical Assets</h4>
                <p className="text-sm font-bold text-white mt-0.5 truncate">Self-Owned Deployment Fleets</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border border-white/5 bg-slate-950/40 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                <Building2 size={18} />
              </div>
              <div className="min-w-0">
                <h4 className="text-[11px] font-mono tracking-wider text-slate-500 uppercase truncate">Corporate Stability</h4>
                <p className="text-sm font-bold text-white mt-0.5 truncate">Registered Since 2020</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: SERVICES PREVIEW BLOCK */}
      <section className="py-20 md:py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="border-b border-white/5 pb-10 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-xs text-cyan-500 uppercase font-mono tracking-widest block mb-2">Our Capabilities</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Core Telecommunication Operations
              </h2>
              <p className="text-sm text-slate-300 mt-1">အဓိက ဆက်သွယ်ရေး အင်ဂျင်နီယာ ဝန်ဆောင်မှု ကဏ္ဍများ</p>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed font-normal">
              Providing modern, urban-grade infrastructure standards consistent with economic development metrics throughout regional sectors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Metro & ODN Construction", titleMm: "မက်ထရိုနှင့် ODN ကွန်ရက် တည်ဆောက်ခြင်း", desc: "Fiber optic backbone configuration arrays." },
              { title: "FTTH Network Setup", titleMm: "FTTH လိုင်း တပ်ဆင်ပြုပြင်ထိန်းသိမ်းခြင်း", desc: "Turnkey client drops and connection configurations." },
              { title: "Telecom Power Arrays", titleMm: "ဆက်သွယ်ရေး ပါဝါစနစ် ဖြေရှင်းချက်များ", desc: "Industrial battery arrays and hybrid electrical backup." },
              { title: "Next.js Web Solutions", titleMm: "လုပ်ငန်းသုံး ခေတ်မီ Website နှင့် စနစ်များ ဖန်တီးခြင်း", desc: "High-performance, optimized enterprise digital architectures." },
            ].map((service) => (
              <div
                key={service.title}
                className="bg-slate-900/60 rounded-xl p-6 border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-colors duration-300 group"
              >
                <div>
                  {service.title.includes("Next.js") && (
                    <div className="text-cyan-400 mb-4 bg-cyan-500/10 w-8 h-8 rounded-lg flex items-center justify-center border border-cyan-500/20">
                      <Code2 size={16} />
                    </div>
                  )}
                  <h3 className="text-base font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-400 mt-1 font-sans">
                    {service.titleMm}
                  </p>
                  <p className="mt-4 text-xs text-slate-500 leading-relaxed font-normal">
                    {service.desc}
                  </p>
                </div>
                
                <div className="pt-6 mt-8 border-t border-white/5" />
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}