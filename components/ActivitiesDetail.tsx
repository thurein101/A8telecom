"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, LayoutGrid } from "lucide-react";
import Image from "next/image"; 
import { useRouter } from "next/navigation";

interface ActivityProps {
  activity: {
    title: string;
    titleMm: string | null;
    subTitle: string | null;
    description: string;
    images: { url: string }[];
    createdAt: Date;
  };
}

export default function ActivityDetailUI({ activity }: ActivityProps) {
  const [activeImg, setActiveImg] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (activity.images && activity.images.length > 0) {
      setActiveImg(activity.images[0].url);
    }
  }, [activity.images]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pt-32 pb-16 antialiased">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Back Navigation Button */}
        <button 
          onClick={() => router.push("/activities?page=1")} 
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-400 font-bold uppercase tracking-wider mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Records
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT CHUNKS: MULTI-PHOTO GALLERY */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Active Image Display */}
            {/* 💡 FIX: Square ပုံများတင်လျှင် ဘေးလွတ်သည့်နေရာတွင် လှပစေရန် relative overflow-hidden ပုံစံဖြင့် background blur effect ထည့်သွင်းထားသည် */}
            <div className="w-full h-[450px] rounded-3xl overflow-hidden bg-slate-900 border border-white/5 relative shadow-2xl flex items-center justify-center">
              {activeImg ? (
                <>
                  {/* Background Blur Image (ခပ်ဝါးဝါးနောက်ခံပုံ) */}
                  <div className="absolute inset-0 opacity-30 blur-2xl scale-110 pointer-events-none">
                    <Image 
                      src={activeImg} 
                      alt="Background Blur" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {/* Actual Sharp Foreground Image (တကယ့်ပုံအမှန်) */}
                  {/* 💡 FIX: object-contain ပြောင်းလိုက်သဖြင့် Square ပုံဖြစ်ပါက ညှပ်မသွားဘဲ တစ်ပုံလုံး အပြည့်ပေါ်မည် */}
                  <div className="relative w-full h-full z-10 p-2 flex items-center justify-center">
                    <Image 
                      src={activeImg} 
                      alt="Main Visual" 
                      fill
                      priority
                      className="object-contain transition-all duration-500 rounded-2xl"
                    />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">No media available</div>
              )}
            </div>
            
            {/* Thumbnail Navigation Indicators */}
            <div className="flex flex-wrap gap-3">
              {activity.images?.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImg(img.url)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 bg-slate-900 relative transition-all duration-300 ${
                    activeImg === img.url 
                      ? "border-cyan-400 scale-95 shadow-[0_0_15px_rgba(34,211,238,0.2)]" 
                      : "border-white/5 opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image 
                    src={img.url} 
                    alt={`thumbnail ${i + 1}`} 
                    fill 
                    sizes="80px"
                    className="object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT CHUNKS: CORE CONTENT TEXTS */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900/20 border border-white/5 p-6 rounded-3xl backdrop-blur-sm">
            <div className="space-y-2">
              <span className="text-[10px] font-mono bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold px-2.5 py-1 rounded-md uppercase tracking-widest inline-flex items-center gap-1">
                <LayoutGrid size={12} /> {activity.subTitle || "Field Operations"}
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight pt-2">
                {activity.title}
              </h1>
              {activity.titleMm && (
                <p className="text-base font-bold text-cyan-400/90">{activity.titleMm}</p>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 border-y border-white/5 py-3 font-mono">
              <Calendar size={13} className="text-slate-600" />
              <span>Project Logged: {activity.createdAt ? new Date(activity.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}</span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed font-normal whitespace-pre-line text-justify">
              {activity.description}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}