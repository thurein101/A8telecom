// 📁 app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
        router.refresh(); // Middleware ကို state အသစ် သိစေရန် တိုက်ရိုက် refresh လုပ်ခိုင်းခြင်း
      } else {
        setError(data.message || "Login ပြုလုပ်ခြင်း မအောင်မြင်ပါ။");
      }
    } catch (err) {
      setError("လိုင်းချိတ်ဆက်မှု ပြဿနာ ရှိနေပါသည်။");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-sans px-4">
      <form 
        onSubmit={handleLogin} 
        className="bg-slate-900 p-8 rounded-2xl border border-white/10 w-full max-w-sm space-y-5 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500" />
        
        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tight text-white flex items-center gap-2">
            Amara8 Control Panel
          </h2>
          <p className="text-xs text-slate-400 font-medium">ဆက်လက်လုပ်ဆောင်ရန် စနစ်ထိန်းသိမ်းသူ အကောင့်ဖြင့် ဝင်ရောက်ပါ</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl flex items-center gap-2">
            <ShieldAlert size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-3.5">
          {/* 🌟 USERNAME INPUT FIELD */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Username</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                placeholder="Enter Admin Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition font-medium"
                required
              />
            </div>
          </div>

          {/* PASSWORD INPUT FIELD */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="password"
                placeholder="Enter Secure Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-500/50 transition"
                required
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 disabled:opacity-50 disabled:scale-100 py-3 rounded-xl font-bold text-sm text-slate-950 active:scale-98 transition shadow-lg shadow-cyan-500/10 mt-2"
        >
          {loading ? "Verifying..." : "Access Dashboard"}
        </button>
      </form>
    </div>
  );
}