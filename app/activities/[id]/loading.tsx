export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pt-32 pb-16 antialiased animate-pulse">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Back Button Skeleton */}
        <div className="w-32 h-4 bg-slate-800 rounded mb-8" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Photo Gallery Skeleton */}
          <div className="lg:col-span-7 space-y-4">
            <div className="w-full h-[450px] rounded-3xl bg-slate-900 border border-white/5" />
            <div className="flex gap-3">
              <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-white/5" />
              <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-white/5" />
              <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-white/5" />
            </div>
          </div>

          {/* RIGHT: Content Skeleton */}
          <div className="lg:col-span-5 space-y-6 bg-slate-900/20 border border-white/5 p-6 rounded-3xl">
            <div className="space-y-3">
              <div className="w-28 h-6 bg-cyan-950/50 rounded-md" />
              <div className="w-3/4 h-8 bg-slate-900 rounded" />
              <div className="w-1/2 h-5 bg-slate-900 rounded" />
            </div>

            <div className="w-full h-px bg-white/5 py-1" />

            <div className="space-y-2">
              <div className="w-full h-4 bg-slate-900 rounded" />
              <div className="w-full h-4 bg-slate-900 rounded" />
              <div className="w-5/6 h-4 bg-slate-900 rounded" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}