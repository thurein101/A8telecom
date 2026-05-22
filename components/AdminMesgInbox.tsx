// app/admin/messages/AdminMessageInbox.tsx
"use client";

import { useTransition } from "react";
import { Mail, Phone, Calendar, User, MessageSquare, Eye, Trash2 } from "lucide-react";
import { markAsRead, deleteMessage } from "@/app/actions/contact";

interface MessageProps {
  messages: {
    id: string;
    name: string;
    phone: string;
    email: string | null;
    subject: string;
    message: string;
    isRead: boolean;
    createdAt: string | Date;
  }[];
}

export default function AdminMessageInbox({ messages }: MessageProps) {
  const [isPending, startTransition] = useTransition();

  // ဖတ်ပြီးကြောင်း လုပ်ဆောင်ချက်
  const handleMarkAsRead = (id: string) => {
    startTransition(async () => {
      const res = await markAsRead(id);
      if (!res.success) alert("Error marking as read");
    });
  };

  // ဖျက်ပစ်မည့် လုပ်ဆောင်ချက်
  const handleDelete = (id: string) => {
    if (confirm("ဤ Message အား ဖျက်ပစ်ရန် သေချာပါသလား?")) {
      startTransition(async () => {
        const res = await deleteMessage(id);
        if (!res.success) alert("Error deleting message");
      });
    }
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-5xl mx-auto text-white text-left font-sans shadow-2xl">
      <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <Mail className="text-cyan-400" size={24} /> Incoming Inquiries Inbox
        </h2>
        <span className="text-xs bg-slate-800 text-slate-400 px-3 py-1.5 rounded-md font-mono">
          Total: {messages.length} Messages
        </span>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <p className="text-xs text-slate-500 py-12 text-center bg-slate-950 rounded-xl border border-white/5">
            လက်ရှိတွင် ဆက်သွယ်ထားသော စာစောင်များ မရှိသေးပါ။
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              // မဖတ်ရသေးလျှင် ညှို့မှိုင်းပြီး လင်းသော Border ပုံစံ၊ ဖတ်ပြီးလျှင် မှိန်သွားသော ပုံစံဖြစ်အောင် ပုံဖော်ထားသည်
              className={`border p-5 rounded-xl transition-all space-y-3 relative ${
                !msg.isRead 
                  ? "bg-slate-950 border-cyan-500/40 shadow-md shadow-cyan-500/5" 
                  : "bg-slate-950/40 border-white/5 opacity-75"
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                  <User size={14} className="text-cyan-500" />
                  <span>{msg.name}</span>

                  {/* NEW BADGE - မဖတ်ရသေးပါက ပြသရန် */}
                  {!msg.isRead && (
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold animate-pulse">
                      NEW
                    </span>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <Calendar size={12} />
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  
                  {/* Action Buttons: စီမံခန့်ခွဲမည့် ခလုတ်များ */}
                  <div className="flex items-center gap-1">
                    {/* မဖတ်ရသေးရင် Mark as read Button ကို ပြမည် */}
                    {!msg.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(msg.id)}
                        disabled={isPending}
                        title="Mark as Read"
                        className="p-1.5 hover:bg-cyan-500/10 text-slate-400 hover:text-cyan-400 rounded-md transition-colors"
                      >
                        <Eye size={15} />
                      </button>
                    )}
                    {/* ဖျက်ပစ်မည့် ခလုတ် */}
                    <button
                      onClick={() => handleDelete(msg.id)}
                      disabled={isPending}
                      title="Delete Message"
                      className="p-1.5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-md transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 text-xs md:text-sm">
                <p className="font-bold text-cyan-400 flex items-center gap-1.5">
                  <MessageSquare size={14} /> Subject: {msg.subject}
                </p>
                {msg.email && (
                  <p className="text-xs text-slate-400 pl-5">Email: {msg.email}</p>
                )}
                <p className="text-slate-300 leading-relaxed font-normal whitespace-pre-wrap pl-5 pt-1">
                  {msg.message}
                </p>
              </div>

              <div className="pt-2 flex items-center gap-1.5 text-xs text-slate-400 border-t border-white/5 mt-2">
                <Phone size={13} className="text-slate-500" />
                <span className="font-mono tracking-wide">Hotline Call-back:</span>
                <a href={`tel:${msg.phone}`} className="text-cyan-400 hover:underline font-semibold">
                  {msg.phone}
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}