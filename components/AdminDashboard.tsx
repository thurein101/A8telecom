"use client"; 

import Link from 'next/link';
import { useState, useEffect, useRef } from "react"; // 🛠️ useRef ကိုပါ ထည့်သွင်းထားပါတယ်
import AdminActivityForm from '@/components/AdminActivity';
import AdminTeam from '@/components/AdminTeam';
import AdminMessageInbox from '@/components/AdminMesgInbox';
import { LogOut, ShieldCheck, MessageSquare } from 'lucide-react';

interface ActivityImage {
  url: string;
  key: string;
}

interface ActivityRecord {
  id: string;
  title: string;
  titleMm: string;
  subTitle: string;
  description: string;
  images: ActivityImage[];
  createdAt: string;
}

interface TeamMemberRecord {
  id: string;
  name: string;
  role: string;
  roleMm: string;
  imageUrl: string;
  imageKey: string;
  order: number;
}

interface MessageRecord {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

interface AdminDashboardProps {
  incomingMessages: MessageRecord[];
  activities: ActivityRecord[];
  teamMembers: TeamMemberRecord[];
}

export default function AdminDashboard({
  incomingMessages,
  activities,
  teamMembers,
}: AdminDashboardProps) {
  const [currentYear, setCurrentYear] = useState<number | string>("");
  
  // 🛠️ မက်ဆေ့ခ်ျအဟောင်းအရေအတွက်ကို မှတ်ထားဖို့နဲ့ ပထမဆုံး load ဖြစ်ချိန်မှာ အသံချက်ချင်းမမြည်အောင် ထိန်းပေးမယ့် Ref တွက်ချက်မှုများ
  const prevMessagesCountRef = useRef<number>(incomingMessages.length);
  const isInitialMount = useRef<boolean>(true);

  const handleLogout = async () => {
    if (confirm("Admin Panel မှ ထွက်ရန် သေချာပါသလား?")) {
      try {
        const res = await fetch("/api/admin/logout", { method: "POST" });
        if (res.ok) {
          window.location.href = "/admin/login"; 
        }
      } catch (error) {
        alert("Logout လုပ်ဆောင်ချက် အမှားအယွင်းရှိနေပါသည်။");
      }
    }
  };

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // 🛠️ Notification Noti အသံပေးမည့် စနစ်
  useEffect(() => {
    // ပထမဆုံး Page စဖွင့်ဖွင့်ချင်း (Initial Load) မှာတင် အသံမြည်မသွားအောင် ကာကွယ်ခြင်း
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // မက်ဆေ့ခ်ျအသစ်တက်လာပြီး ယခင်အရေအတွက်ထက် ပိုများလာပါက Noti အသံပေးမည်
    if (incomingMessages.length > prevMessagesCountRef.current) {
      try {
        // Browser မှာ အများဆုံးသုံးကြတဲ့ ခေတ်မီစနစ်သုံး Noti အသံ URL (စမ်းသပ်ရန် သုံးထားသည်)
        // မိမိစိတ်ကြိုက် အသံဖိုင်ရှိပါက public/ ကထဲထည့်ပြီး '/sounds/noti.mp3' ပုံစံမျိုး ပြောင်းသုံးနိုင်သည်
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-84.wav");
        audio.volume = 0.5; // အသံပမာဏ (0.0 မှ 1.0 အထိ)
        audio.play();
      } catch (error) {
        console.error("Audio playback failed:", error);
      }
    }

    // အရေအတွက်ကို နောက်ဆုံးအခြေအနေအတိုင်း Update လုပ်ပြီး မှတ်ထားမည်
    prevMessagesCountRef.current = incomingMessages.length;
  }, [incomingMessages]); // incomingMessages ပြောင်းလဲတိုင်း စစ်ဆေးမည်

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans pt-28 pb-16 antialiased">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* HEADER SECTION */}
        <div className="border-b border-white/5 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <ShieldCheck className="text-cyan-400 shrink-0" size={32} />
              Amara8 Corporate Control Panel
            </h1>
            <p className="text-xs text-slate-400 uppercase font-mono tracking-widest text-cyan-400">
              System Admin Dashboard
            </p>
          </div>

          {/* BUTTONS GROUP */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            
            {/* View Messages Button */}
            <Link
              href="/admin/message"
              className="relative inline-flex items-center justify-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 hover:border-cyan-500/40 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-cyan-500/5 active:scale-95 group"
            >
              <MessageSquare size={16} className="group-hover:scale-110 transition-transform" />
              <span>View Messages</span>
              
              {/* 🛠️ Message အသစ်ရှိနေရင် ခလုတ်ပေါ်မှာ Noti အနီစက်လေး ပြေးနေမည့် Glow Badge */}
              {incomingMessages.some(m => !m.isRead) && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              )}
            </Link>

            {/* SIGN OUT BUTTON */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-red-500/10 text-slate-300 hover:text-red-400 border border-white/10 hover:border-red-500/20 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg active:scale-95 group shrink-0"
            >
              <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>Sign Out</span>
            </button>
            
          </div>
        </div>

        {/* 1. Activity Content Management */}
        <section className="space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 font-bold">1. Activity Content Management</h3>
          <AdminActivityForm initialActivities={activities} />
        </section>

        {/* 2. Team Member Management */}
        <section className="space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 font-bold">2. Team Member Management</h3>
          <AdminTeam initialMembers={teamMembers} />
        </section>

        

      </div>
    </div>
  );
}