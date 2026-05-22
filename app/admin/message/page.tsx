// app/admin/messages/page.tsx
import { prisma } from "@/lib/prisma";
import AdminMessageInbox from "@/components/AdminMesgInbox"; // UI Component ကို ပြန်ခေါ်သုံးမည်

export const revalidate = 0; // Dynamic ဖြစ်စေရန် (Cache မသိမ်းရန်)

export default async function AdminMessagesPage() {
  
  const messages = await prisma.contactMessage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4">
      <AdminMessageInbox messages={messages} />
    </div>
  );
}