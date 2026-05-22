"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, HardHat, Eye } from "lucide-react";
import Image from "next/image";
import ActivityDetailUI from "../ActivitiesDetail";
import Link from "next/link";

interface ActivityData {
  id: string | number;
  title: string;
  titleMm: string;
  subTitle: string;
  description: string;
  descriptionMm?: string;
  images: { url: string }[];
  createdAt: string | Date;
}

interface ActivitiesComProps {
  initialActivities: ActivityData[];
  currentPage: number;
  totalPages: number;
}

export default function ActivitiesCom({
  initialActivities,
  currentPage,
  totalPages,
}: ActivitiesComProps) {
  const [selectedActivity, setSelectedActivity] = useState<ActivityData | null>(
    null,
  );

  if (selectedActivity) {
    return (
      <ActivityDetailUI
        activity={{
          title: selectedActivity.title,
          titleMm: selectedActivity.titleMm,
          subTitle: selectedActivity.subTitle || "Field Operations",
          description: selectedActivity.descriptionMm
            ? `${selectedActivity.description}\n\n${selectedActivity.descriptionMm}`
            : selectedActivity.description,
          images: selectedActivity.images,
          createdAt: new Date(selectedActivity.createdAt),
        }}
      />
    );
  }

  return (
    <main className="bg-slate-950 text-white font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-400">
      {/* HEADER SECTION */}
      <section className="relative pt-44 pb-20 bg-gradient-to-b from-slate-900/40 via-slate-950 to-slate-950 border-b border-white/[0.04]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293706_1px,transparent_1px),linear-gradient(to_bottom,#1f293706_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-widest text-[11px] bg-cyan-950/30 border border-cyan-500/20 px-3 py-1 rounded-full backdrop-blur-md">
            <HardHat size={12} />
            <span>Field Operations • Operational Logs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mt-5 tracking-tight max-w-4xl bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
            Latest Project Records & Activities
          </h1>
          <p className="text-lg md:text-xl font-bold text-slate-400 mt-2 tracking-wide">
            မြေပြင်လုပ်ငန်းခွင်မှတ်တမ်းများနှင့် ကုမ္ပဏီလှုပ်ရှားမှုများ
          </p>
        </div>
      </section>

      {/* PROJECTS LIST WITH HIGH-LUMINOUS CARDS */}
      <section className="py-24 max-w-5xl mx-auto px-6 space-y-10">
        {initialActivities.length === 0 ? (
          <div className="rounded-3xl border border-white/5 bg-slate-900/10 p-16 text-center text-slate-500 text-sm max-w-xl mx-auto">
            No dynamic project logs emitted from deployment registry yet.
          </div>
        ) : (
          initialActivities.map((activity, index) => {
            const isEven = index % 2 === 0;

            const firstImageUrl =
              activity.images && activity.images.length > 0
                ? activity.images[0].url
                : "/placeholder-telecom.jpg";

            return (
              <div
                key={activity.id}
                // 🛠️ Fix: bg-white/[0.06] နှင့် border-white/15 ကိုသုံးပြီး ကတ်များကို အလင်းပွင့် ပရီမီယံဒီဇိုင်း ပြောင်းထားပါသည်။
                className="bg-white/[0.05] backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/[0.09] hover:border-cyan-500/40 hover:shadow-cyan-500/[0.04] transition-all duration-300 group"
              >
                {/* Individual Post Layout */}
                <div
                  className={`flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* 1. Image Block */}
                  <div className="w-full lg:w-[42%] flex">
                    <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-[16/10] lg:aspect-auto w-full min-h-[220px] md:min-h-[250px] bg-slate-950 shadow-inner">
                      <Image
                        src={firstImageUrl}
                        alt={activity.title}
                        fill
                        sizes="(max-w-1024px) 100vw, 40vw"
                        priority={index < 2}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102 opacity-100"
                      />
                      <div className="absolute top-3 left-3 bg-slate-950/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 text-[10px] text-cyan-400 font-semibold">
                        <MapPin size={11} className="text-cyan-500" />
                        {activity.subTitle || "Field Operations"}
                      </div>
                    </div>
                  </div>

                  {/* 2. Professional Content Block */}
                  <div className="w-full lg:w-[58%] flex flex-col justify-between py-1 text-left">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-mono mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(activity.createdAt).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" },
                          )}
                        </span>
                        <span>•</span>
                        <span className="text-cyan-400 tracking-wider font-bold">
                          Deploy #{index + 1}
                        </span>
                      </div>

                      <h2 className="text-lg md:text-xl font-extrabold tracking-tight text-white leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                        {activity.title}
                      </h2>

                      <p className="text-xs font-semibold text-cyan-400 mt-1 mb-3">
                        {activity.titleMm}
                      </p>

                      {/* Description Wrapper */}
                      <div className="space-y-2 border-l border-white/10 pl-4 my-3">
                        <p className="text-slate-200 text-xs md:text-sm leading-relaxed font-normal line-clamp-2">
                          {activity.description}
                        </p>
                        
                        {activity.descriptionMm && (
                          <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-normal line-clamp-2">
                            {activity.descriptionMm}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Read Actions */}
                    <div className="pt-3 border-t border-white/10 mt-auto">
                      <Link
                        href={`/activities/${activity.id}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider hover:text-cyan-300 transition-colors group/link"
                      >
                        <Eye size={13} />
                        <span>View Operational Gallery Logs</span>
                        <span className="transform translate-x-0 group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* PAGINATION */}
        <div className="flex items-center justify-center gap-3 pt-12">
          {/* Previous */}
          {currentPage > 1 && (
            <Link
              href={`/activities?page=${currentPage - 1}`}
              className="px-4 py-2 rounded-xl border border-white/10 text-sm text-slate-300 hover:bg-white/5 transition"
            >
              Previous
            </Link>
          )}

          {/* Page Numbers */}
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;

            return (
              <Link
                key={page}
                href={`/activities?page=${page}`}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition ${
                  currentPage === page
                    ? "bg-cyan-500 text-slate-950"
                    : "border border-white/10 text-slate-300 hover:bg-white/5"
                }`}
              >
                {page}
              </Link>
            );
          })}

          {/* Next */}
          {currentPage < totalPages && (
            <Link
              href={`/activities?page=${currentPage + 1}`}
              className="px-4 py-2 rounded-xl border border-white/10 text-sm text-slate-300 hover:bg-white/5 transition"
            >
              Next
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}