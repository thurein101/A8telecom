
"use client";

import { useState } from "react";
import { createContactMessage } from "@/app/actions/contact";
import { contactSchema } from "@/lib/validation/contact";

import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Building2,
  CheckCircle2,
} from "lucide-react";

export default function ContactCom() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Business Inquiry",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    const validated = contactSchema.safeParse(formState);

    if (!validated.success) {
      const fieldErrors: Record<string, string> = {};

      validated.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      setLoading(true);

      const res = await createContactMessage(validated.data);

      if (res.success) {
        setIsSubmitted(true);

        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);

        setFormState({
          name: "",
          email: "",
          phone: "",
          subject: "Business Inquiry",
          message: "",
        });

        setErrors({});
      } else {
        setErrors({
          message: "Failed to send message.",
        });
      }
    } catch {
      setErrors({
        message: "Unexpected server error.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field: string) => `
    bg-slate-950 border rounded-xl px-4 py-3 text-sm
    focus:outline-none transition-colors
    placeholder:text-slate-600
    ${
      errors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-white/10 focus:border-cyan-400"
    }
  `;

  return (
    <main className="bg-slate-950 text-white font-sans antialiased">
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

      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">
                Corporate HQ
              </span>

              <h2 className="text-2xl font-bold tracking-tight text-white mt-1">
                Official Contact Info
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                ကုမ္ပဏီရုံးချုပ်နှင့် ဆက်သွယ်ရန် လိပ်စာအချက်အလက်များ
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="bg-slate-900/50 border border-white/10 rounded-xl p-5 flex items-start gap-4">
                <MapPin className="text-cyan-400 mt-1 shrink-0" size={20} />

                <div className="text-left">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">
                    Registered Head Office
                  </span>

                  <p className="text-sm font-semibold text-white mt-1 leading-relaxed">
                    No. 8, Kabar Kyaw Street, Pyithaya Quarter, Pyay,
                    Myanmar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-900/40 border border-white/10 rounded-2xl p-8 relative">
            <div>
              <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider block">
                Direct Mail
              </span>

              <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                Send Us a Message
              </h2>
            </div>

            {errors.message && (
              <div className="mt-6 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-4">
                {errors.message}
              </div>
            )}

            {isSubmitted ? (
              <div className="mt-8 bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-6 flex flex-col items-center text-center justify-center min-h-[350px]">
                <CheckCircle2
                  size={44}
                  className="text-emerald-400 mb-4"
                />

                <h3 className="text-lg font-bold text-white">
                  Message Sent Successfully!
                </h3>

                <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">
                  လူကြီးမင်းပေးပို့သော မက်ဆေ့ခ်ျအား အောင်မြင်စွာ
                  လက်ခံရရှိပါပြီ။
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5 font-sans">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Your Name *
                    </label>

                    <input
                      type="text"
                      placeholder="U Mg Mg"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          name: e.target.value,
                        })
                      }
                      className={inputStyle("name")}
                    />

                    {errors.name && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Phone Number *
                    </label>

                    <input
                      type="text"
                      placeholder="0912345678"
                      value={formState.phone}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          phone: e.target.value,
                        })
                      }
                      className={inputStyle("phone")}
                    />

                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="example@company.com"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        email: e.target.value,
                      })
                    }
                    className={inputStyle("email")}
                  />

                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Inquiry Subject
                  </label>

                  <select
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        subject: e.target.value,
                      })
                    }
                    className={inputStyle("subject")}
                  >
                    <option value="Business Inquiry">
                      Business Infrastructure Inquiry
                    </option>

                    <option value="FTTH Installation">
                      FTTH Last-Mile Request
                    </option>

                    <option value="Maintenance Request">
                      Network Maintenance Project
                    </option>

                    <option value="Other">Other Matters</option>
                  </select>

                  {errors.subject && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.subject}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Your Message *
                  </label>

                  <textarea
                    rows={4}
                    placeholder="Please type detail structural requirements or infrastructure inquiries here..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        message: e.target.value,
                      })
                    }
                    className={`${inputStyle(
                      "message"
                    )} resize-none leading-relaxed`}
                  />

                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 text-xs font-bold uppercase tracking-widest py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send size={14} />

                  {loading
                    ? "Sending Inquiry..."
                    : "Submit Inquiry Log • ကုမ္ပဏီသို့ပေးပို့ရန်"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}


