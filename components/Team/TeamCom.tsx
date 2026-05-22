"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Award, Briefcase, Users } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  roleMm: string;
  imageUrl: string;
  imageKey: string;
  order: number;
}

interface TeamComProps {
  members: TeamMember[];
}

export default function TeamCom({ members }: TeamComProps) {
  // 🛠️ Optimization: Server ဘက်က Prisma နဲ့ order အတိုင်း စီပေးလိုက်ပြီဖြစ်လို့ 
  // Client ဘက်မှာ ထပ်မံ Sort လုပ်စရာမလိုတော့ဘဲ တိုက်ရိုက် သုံးစွဲလိုက်ပါတယ်ဗျာ။
  return (
    <main className="bg-[#030712] text-white font-sans antialiased overflow-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 border-b border-white/[0.04] overflow-hidden">
        {/* GRID BACKGROUND */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f29370a_1px,transparent_1px),linear-gradient(to_bottom,#1f29370a_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* SOFT GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[420px] h-[220px] bg-cyan-500/10 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-5 sm:px-6 relative z-10">
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-400 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
            <ShieldCheck size={11} />
            Executive Leadership
          </div>

          {/* TITLE */}
          <h1 className="text-3xl md:text-5xl font-black mt-5 tracking-tight leading-tight max-w-4xl text-white">
            Professional Engineering & Leadership Team
          </h1>

          {/* LINE */}
          <div className="h-1 w-14 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-full mt-5" />

          {/* MYANMAR TEXT */}
          <p className="text-base md:text-xl font-medium text-slate-400 mt-5 max-w-2xl leading-relaxed">
            အမှုဆောင်အရာရှိများနှင့် ကျွမ်းကျင်အင်ဂျင်နီယာအဖွဲ့
          </p>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-12 border-b border-white/5 pb-6">
          <div>
            <span className="text-[11px] text-cyan-400 font-semibold uppercase tracking-[0.2em] flex items-center gap-1.5">
              <Users size={12} />
              Team Members
            </span>

            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-2">
              Meet Our Leaders
            </h2>
          </div>
        </div>

        {/* EMPTY STATE */}
        {members.length === 0 ? (
          <div className="rounded-3xl border border-white/[0.06] bg-slate-900/40 p-10 text-center text-slate-500 max-w-xl mx-auto">
            No team members available.
          </div>
        ) : (
          /* TEAM GRID */
          <div className="grid gap-3 sm:gap-5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
            {members.map((member, index) => {
              const isTopLeader = index === 0 || member.order === 1;

              return (
                <div
                  // 🛠️ FIX: Cache ငြိပြီး UI မှားယွင်းမှု မရှိစေရန် unique key တစ်ခုအဖြစ် ပေါင်းစပ်သတ်မှတ်ခြင်း
                  key={`team-member-${member.id}-${index}`}
                  className={`group relative rounded-2xl md:rounded-3xl overflow-hidden border bg-gradient-to-b from-slate-900/80 to-slate-950 shadow-xl hover:-translate-y-1 transition-all duration-300 ${
                    isTopLeader
                      ? "border-cyan-500/20 hover:border-cyan-400/40"
                      : "border-white/[0.05] hover:border-white/10"
                  }`}
                >
                  {/* IMAGE */}
                  <div className="relative h-[190px] sm:h-[260px] md:h-[280px] overflow-hidden bg-slate-950">
                    <Image
                      src={member.imageUrl}
                      alt={member.name}
                      fill
                      priority={index < 4}
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                    {/* EXECUTIVE BADGE */}
                    {isTopLeader && (
                      <div className="absolute top-2 left-2 md:top-4 md:left-4 flex items-center gap-1 bg-slate-950/80 backdrop-blur-md border border-cyan-500/20 text-cyan-400 text-[8px] md:text-[9px] uppercase tracking-widest px-2 py-0.5 md:px-2.5 md:py-1 rounded-full font-bold">
                        <Award size={9} />
                        <span className="hidden xs:inline">Executive</span>
                        <span className="xs:hidden">Exec</span>
                      </div>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-3 md:p-5 flex flex-col justify-between space-y-3">
                    <div>
                      {/* NAME */}
                      <h3 className="text-sm md:text-lg font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {member.name}
                      </h3>

                      {/* ROLE */}
                      <div className="flex items-center gap-1 mt-1 text-[9px] md:text-[11px] text-cyan-400 uppercase tracking-wider font-semibold line-clamp-1">
                        <Briefcase size={10} className="text-cyan-500/70 shrink-0" />
                        <span className="truncate">{member.role}</span>
                      </div>
                    </div>

                    {/* MYANMAR ROLE */}
                    <div className="pt-2 border-t border-white/[0.05]">
                      <p className="text-[11px] md:text-[12px] text-slate-400 leading-normal bg-slate-900/60 border border-white/[0.03] rounded-lg px-2 py-1.5 line-clamp-2 md:line-clamp-none min-h-[40px] md:min-h-0">
                        {member.roleMm}
                      </p>
                    </div>
                  </div>

                  {/* BOTTOM ACCENT */}
                  <div
                    className={`h-1 w-full transition-all duration-300 ${
                      isTopLeader
                        ? "bg-gradient-to-r from-cyan-400 to-cyan-600"
                        : "bg-slate-700"
                    }`}
                  />
                </div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}