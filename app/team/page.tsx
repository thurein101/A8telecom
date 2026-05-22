import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import TeamCom from "@/components/Team/TeamCom";


export const dynamic = "force-dynamic";

async function TeamDataSection() {
  const teamMembers = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });

  return <TeamCom members={teamMembers} />;
}

export default function TeamPage() {
  return (
    <div className="bg-[#030712] min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#030712] flex items-center justify-center text-cyan-400 font-mono text-xs tracking-widest animate-pulse">
            LOADING TEAM ROSTER...
          </div>
        }
      >
        <TeamDataSection />
      </Suspense>
    </div>
  );
}