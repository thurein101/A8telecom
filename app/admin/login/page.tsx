"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ShieldAlert } from "lucide-react";

import { adminLoginSchema } from "@/lib/validation/admin-login";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});
    setServerError("");

    const validated = adminLoginSchema.safeParse({
      username,
      password,
    });

    if (!validated.success) {
      const fieldErrors: Record<string, string> = {};

      validated.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validated.data),
      });

      const data = await res.json();

      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setServerError(
          data.message || "Login failed."
        );
      }
    } catch {
      setServerError(
        "Network connection problem."
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = (field: string) => `
    w-full bg-slate-950 border rounded-xl
    pl-10 pr-4 py-3 text-sm text-slate-200
    focus:outline-none transition
    ${
      errors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-white/5 focus:border-cyan-500/50"
    }
  `;

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

          <p className="text-xs text-slate-400 font-medium">
            ဆက်လက်လုပ်ဆောင်ရန် စနစ်ထိန်းသိမ်းသူ
            အကောင့်ဖြင့် ဝင်ရောက်ပါ
          </p>
        </div>

        {serverError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-xl flex items-center gap-2">
            <ShieldAlert
              size={16}
              className="shrink-0"
            />

            <span>{serverError}</span>
          </div>
        )}

        <div className="space-y-3.5">
          {/* USERNAME */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Username
            </label>

            <div className="relative">
              <User
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />

              <input
                type="text"
                placeholder="Enter Admin Username"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                className={inputStyle("username")}
              />
            </div>

            {errors.username && (
              <p className="text-red-400 text-xs">
                {errors.username}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Password
            </label>

            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                size={16}
              />

              <input
                type="password"
                placeholder="Enter Secure Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className={inputStyle("password")}
              />
            </div>

            {errors.password && (
              <p className="text-red-400 text-xs">
                {errors.password}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-xl font-bold text-sm text-slate-950 active:scale-[0.98] transition shadow-lg shadow-cyan-500/10 mt-2"
        >
          {loading
            ? "Verifying..."
            : "Access Dashboard"}
        </button>
      </form>
    </div>
  );
}