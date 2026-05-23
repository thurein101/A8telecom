"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    
    console.error("Activity Detail Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex items-center justify-center p-6 antialiased">
      <div className="max-w-md w-full bg-slate-900/40 border border-white/5 rounded-3xl p-8 backdrop-blur-md text-center space-y-6 shadow-2xl">
        
        {/* Error Icon */}
        <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <AlertTriangle size={28} />
        </div>

        {/* Text Details */}
        <div className="space-y-2">
          <h2 className="text-xl font-black tracking-tight">Data Sync Interrupted</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            မြေပြင်လုပ်ငန်းမှတ်တမ်းများကို ဆွဲယူရာတွင် အခက်အခဲတစ်ခုရှိနေပါသည်။ လိုင်းပြန်တက်လာလျှင် ထပ်မံကြိုးစားကြည့်ပါဗျာ။
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={() => reset()}
            className="w-full inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.2)] active:scale-95"
          >
            <RefreshCw size={14} />
            Try Re-connecting
          </button>
        </div>

      </div>
    </div>
  );
}