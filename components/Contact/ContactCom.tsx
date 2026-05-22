"use client";

import { useState } from "react";
import { createContactMessage } from "@/app/actions/contact";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Building2,
  CheckCircle2
} from "lucide-react";

export default function ContactCom() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Business Inquiry",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const res = await createContactMessage({
    name: formState.name,
    email: formState.email,
    phone: formState.phone,
    subject: formState.subject,
    message: formState.message,
  });

  if (res.success) {
    setIsSubmitted(true);

    setTimeout(() => setIsSubmitted(false), 5000);

    setFormState({
      name: "",
      email: "",
      phone: "",
      subject: "Business Inquiry",
      message: "",
    });
  } else {
    alert("Failed to send message.");
  }
};
  return (
    <main className="bg-slate-950 text-white font-sans antialiased">
      
      {/* 1. HEADER SECTION (TEXT CENTER) */}
      <section className="relative pt-40 pb-16 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-white/5 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center">
          <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-xs justify-center">
            <Building2 size={14} />
            Get In Touch • Amara8 Co., Ltd.
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-6 tracking-tight leading-tight">
            Let's Build Connected Future Together
          </h1>
          <p className="text-lg md:text-xl font-bold text-slate-300 mt-3 tracking-wide max-w-2xl">
            စီမံကိန်းများနှင့် နည်းပညာပိုင်းဆိုင်ရာ ဆွေးနွေးတိုင်ပင်ရန် ဆက်သွယ်နိုင်ပါသည်။
          </p>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & FORM GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: CORPORATE INFORMATION (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">Corporate HQ</span>
              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">Official Contact Info</h2>
              <p className="text-xs text-slate-400 mt-1">ကုမ္ပဏီရုံးချုပ်နှင့် ဆက်သွယ်ရန် လိပ်စာအချက်အလက်များ</p>
            </div>

            <div className="space-y-4 pt-4">
              
              {/* Address Card */}
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 flex items-start gap-4">
                <MapPin className="text-cyan-400 mt-1 shrink-0" size={20} />
                <div className="text-left">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Registered Head Office</span>
                  <p className="text-sm font-semibold text-white mt-1 leading-relaxed">
                    No. 8, Kabar Kyaw Street, Pyithaya Quarter, Pyay, Myanmar.
                  </p>
                  <p className="text-xs text-slate-400 mt-1">ပြည်မြို့၊ ပြည်သာယာရပ်ကွက်၊ ကမ္ဘာကျော်လမ်း၊ အမှတ် (၈)</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 flex items-start gap-4">
                <Mail className="text-cyan-400 mt-1 shrink-0" size={20} />
                <div className="text-left">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Email Communications</span>
                  <a href="mailto:info@amara8.com" className="text-sm font-semibold text-white mt-1 block hover:text-cyan-400 transition-colors">
                    info@amara8.com
                  </a>
                  <p className="text-xs text-slate-400 mt-0.5">ရုံးသုံးတရားဝင် အီးမေးလ်လိပ်စာ</p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 flex items-start gap-4">
                <Phone className="text-cyan-400 mt-1 shrink-0" size={20} />
                <div className="text-left">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Hotline & Operations</span>
                  <p className="text-sm font-semibold text-white mt-1 tracking-wider">
                    +95 9 987 654 321
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">ဆက်သွယ်ရန် ဖုန်းနံပါတ်များ</p>
                </div>
              </div>

              {/* Working Hours Card */}
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 flex items-start gap-4">
                <Clock className="text-cyan-400 mt-1 shrink-0" size={20} />
                <div className="text-left">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Office Hours</span>
                  <p className="text-sm font-semibold text-white mt-1">
                    Mon - Sat • 08:30 AM - 05:00 PM
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">ရုံးဖွင့်ချိန် (တနင်္ဂနွေနှင့် အစိုးရရုံးပိတ်ရက်များ ပိတ်ပါသည်)</p>
                </div>
              </div>

            </div>
          </div>

          {/* RIGHT: INTERACTIVE CONTACT FORM (7 Columns) */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-white/10 rounded-2xl p-8 relative">
            <div>
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">Direct Mail</span>
              <h2 className="text-xl font-bold tracking-tight text-white mt-1">Send Us a Message</h2>
              <p className="text-xs text-slate-400 mt-1">လုပ်ငန်းဆိုင်ရာ စုံစမ်းမေးမြန်းမှုများအား ဤနေရာမှ တိုက်ရိုက်ပေးပို့နိုင်ပါသည်။</p>
            </div>

            {isSubmitted ? (
              <div className="mt-8 bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-6 flex flex-col items-center text-center justify-center min-h-[350px]">
                <CheckCircle2 size={44} className="text-emerald-400 mb-4" />
                <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">
                  თქვენი შეტყობინება წარმატებით გაიგზავნა။ လူကြီးမင်းထံသို့ တာဝန်ရှိသူတစ်ဦးမှ အီးမေးလ် သို့မဟုတ် ဖုန်းဖြင့် အမြန်ဆုံး ပြန်လည်ဆက်သွယ်ပေးပါမည်။
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5 font-sans">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Name *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="U Mg Mg" 
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="0912345678" 
                      value={formState.phone}
                      onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="example@company.com" 
                    value={formState.email}
                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                    className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors placeholder:text-slate-600"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Inquiry Subject</label>
                  <select 
                    value={formState.subject}
                    onChange={(e) => setFormState({...formState, subject: e.target.value})}
                    className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors text-slate-300"
                  >
                    <option value="Business Inquiry">Business Infrastructure Inquiry (အခြေခံအဆောက်အအုံ တည်ဆောက်ရေးဆိုင်ရာ)</option>
                    <option value="FTTH Installation">FTTH Last-Mile Request (ဖိုင်ဘာအင်တာနက်လိုင်း တပ်ဆင်ခြင်းဆိုင်ရာ)</option>
                    <option value="Maintenance Request">Network Maintenance Project (ပြုပြင်ထိန်းသိမ်းမှုဆိုင်ရာ)</option>
                    <option value="Other">Other Matters (အခြားအကြောင်းအရာ)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Message *</label>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Please type detail structural requirements or infrastructure inquiries here..." 
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors resize-none placeholder:text-slate-600 leading-relaxed"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold uppercase tracking-widest py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  Submit Inquiry Log • ကုမ္ပဏီသို့ပေးပို့ရန်
                </button>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* 3. LOCATION MAP AREA */}
      <section className="w-full h-[400px] bg-slate-900 border-t border-white/10 relative overflow-hidden">
        {/* တကယ့် Map ချိတ်လိုပါက iframe link ကို src တွင် အစားထိုးနိုင်ပါသည် */}
        <iframe 
          title="Amara8 HQ Location Map in Pyay"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15024.316886862598!2d95.215!3d18.815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c7e21a22222221%3A0x2222222222222222!2sPyay%2C%20Myanmar!5e0!3m2!1sen!2smm!4v1700000000000" 
          className="w-full h-full border-0 grayscale opacity-40 invert contract-map"
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="absolute bottom-6 left-6 bg-slate-950/90 backdrop-blur-md border border-white/10 p-4 rounded-xl max-w-sm hidden md:block">
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Pyay HQ Location Pin</p>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            No. 8, Kabar Kyaw Street, Pyithaya Quarter, Pyay, Bago Region.
          </p>
        </div>
      </section>

    </main>
  );
}