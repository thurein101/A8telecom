"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { createTeamMember, updateTeamMember, deleteTeamMember } from "@/app/actions/team";
import { Plus, ImagePlus, Trash2, Pencil, Save, X, Users } from "lucide-react";
import Image from "next/image";

interface TeamMemberRecord {
  id: string;
  name: string;
  role: string;
  roleMm: string;
  imageUrl: string;
  imageKey: string;
  order: number;
}

interface AdminTeamProps {
  initialMembers: TeamMemberRecord[];
}

export default function AdminTeam({ initialMembers }: AdminTeamProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");
  const [status, setStatus] = useState("");

  // Create Form States
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [roleMm, setRoleMm] = useState("");
  const [order, setOrder] = useState(0);
  const [teamImage, setTeamImage] = useState<{ url: string; key: string } | null>(null);

  // Edit Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editRoleMm, setEditRoleMm] = useState("");
  const [editOrder, setEditOrder] = useState(0);
  const [editImage, setEditImage] = useState<{ url: string; key: string } | null>(null);

  const resetCreateForm = () => {
    setName("");
    setRole("");
    setRoleMm("");
    setOrder(0);
    setTeamImage(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamImage) {
      return alert("Please upload an image before creating a team member.");
    }

    setStatus("Creating team member profile...");
    try {
      await createTeamMember({
        name,
        role,
        roleMm,
        imageUrl: teamImage.url,
        imageKey: teamImage.key,
        order,
      });
      setStatus("Team member added successfully.");
      resetCreateForm();
      startTransition(() => router.refresh());
      setTimeout(() => {
        setStatus("");
        setActiveTab("manage");
      }, 2000);
    } catch (error) {
      alert("Create failed. Please try again.");
      setStatus("");
    }
  };

  const beginEdit = (member: TeamMemberRecord) => {
    setEditingId(member.id);
    setEditName(member.name);
    setEditRole(member.role);
    setEditRoleMm(member.roleMm);
    setEditOrder(member.order);
    setEditImage(null);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    setStatus("Updating team member details...");
    try {
      const existing = initialMembers.find((member) => member.id === editingId);
      await updateTeamMember(editingId, {
        name: editName,
        role: editRole,
        roleMm: editRoleMm,
        imageUrl: editImage?.url ?? existing?.imageUrl ?? "",
        imageKey: editImage?.key ?? existing?.imageKey ?? "",
        order: editOrder,
      });
      setStatus("Team member updated successfully.");
      setEditingId(null);
      startTransition(() => router.refresh());
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      alert("Update failed. Please try again.");
      setStatus("");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this team member?")) return;
    try {
      await deleteTeamMember(id);
      setStatus("Team member deleted.");
      startTransition(() => router.refresh());
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      alert("Delete failed. Please try again.");
    }
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 md:p-8 max-w-5xl mx-auto text-white font-sans text-left space-y-6">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div className="flex items-center gap-3">
          <Users className="text-cyan-400" size={24} />
          <div>
            <h2 className="text-xl font-black tracking-tight">Team Member Management</h2>
            <p className="text-xs text-slate-400 mt-1">Create, update, or remove team member profiles.</p>
          </div>
        </div>

        {/* TABS CONTROL */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 self-start md:self-auto">
          <button
            onClick={() => setActiveTab("create")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "create" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Plus size={14} /> Add Member
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "manage" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            Roster ({initialMembers.length})
          </button>
        </div>
      </div>

      {status && (
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-sm animate-pulse">
          {status}
        </div>
      )}

      {/* TAB 1: CREATE FORM */}
      {activeTab === "create" && (
        <form onSubmit={handleCreate} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition"
                placeholder="e.g. U Thurein"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Display Order Position</label>
              <input
                type="number"
                required
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Role (English)</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition"
                placeholder="e.g. Chief Technology Officer"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold">Role (Myanmar)</label>
              <input
                type="text"
                required
                value={roleMm}
                onChange={(e) => setRoleMm(e.target.value)}
                className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition"
                placeholder="ဥပမာ။ နည်းပညာပိုင်းဆိုင်ရာ အကြီးအကဲ"
              />
            </div>
          </div>

          {/* IMAGE UPLOAD ZONE */}
          <div className="border border-white/10 bg-slate-950/40 rounded-xl p-4 space-y-4">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider font-bold block flex items-center gap-1.5">
              <ImagePlus size={14} className="text-cyan-400" /> Avatar Photo Profile (UploadThing CDN)
            </label>

            <UploadDropzone
              endpoint="memberImageUploader"
              onClientUploadComplete={(res) => {
                const file = res[0];
                setTeamImage({ url: file.url, key: file.key });
                alert("Profile avatar uploaded successfully.");
              }}
              onUploadError={(error: Error) => alert(`Upload Error: ${error.message}`)}
              className="ut-label:text-cyan-400 ut-button:bg-cyan-500 ut-button:text-slate-950 ut-button:font-bold bg-slate-950 border-white/5"
            />

            {teamImage && (
              <div className="flex items-center gap-3 p-2 bg-slate-950 rounded-xl border border-white/5 w-fit">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10">
                  <Image src={teamImage.url} alt="Avatar Preview" fill className="object-cover" />
                </div>
                <div className="text-xs">
                  <p className="text-emerald-400 font-semibold">✓ Image Attachment Confirmed</p>
                  <button type="button" onClick={() => setTeamImage(null)} className="text-rose-400 hover:underline mt-1 block">Remove image</button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-bold uppercase tracking-widest py-4 px-6 rounded-xl hover:opacity-90 transition-opacity"
          >
            Create Team Member
          </button>
        </form>
      )}

      {/* TAB 2: ROSTER LIST MANAGEMENT */}
      {activeTab === "manage" && (
        <div className="space-y-4">
          {initialMembers.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/5 rounded-2xl bg-slate-950/20">
              <p className="text-sm text-slate-400">No organizational team profiles deployed yet.</p>
            </div>
          ) : (
            // Order ကြီးတဲ့လူ/ငယ်တဲ့လူ အစီအစဉ်အတိုင်း Sorted ပြေးပေးထားပါတယ်
            [...initialMembers].sort((a,b) => a.order - b.order).map((member) => (
              <div key={member.id} className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 space-y-4">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {/* 🌟 NEXT.JS IMAGE COMPONENT ဖြင့် ပုံများကို နေရာချပေးထားသည် */}
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-cyan-500/20 bg-slate-900 shrink-0">
                      <Image 
                        src={member.imageUrl || "/fallback-avatar.png"} 
                        alt={member.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-white">{member.name}</h4>
                        <span className="text-[9px] bg-slate-800 border border-white/5 px-1.5 py-0.5 rounded text-slate-400 font-mono">Pos: {member.order}</span>
                      </div>
                      <p className="text-xs text-cyan-400 font-medium tracking-wider uppercase mt-0.5">{member.role}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{member.roleMm}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 self-end sm:self-auto shrink-0">
                    <button type="button" onClick={() => beginEdit(member)} className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 px-3 py-1.5 text-cyan-400 hover:bg-cyan-500/10 transition">
                      <Pencil size={13} /> Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(member.id)} className="flex items-center gap-1.5 rounded-lg border border-rose-500/20 px-3 py-1.5 text-rose-400 hover:bg-rose-500/10 transition">
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>

                {/* INLINE EDIT EXPANSION PANEL */}
                {editingId === member.id && (
                  <form onSubmit={handleUpdate} className="space-y-4 border-t border-white/10 pt-5 mt-4 bg-slate-950/60 p-4 rounded-xl">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
                      <Pencil size={14} className="text-cyan-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Modify Member Records</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-slate-400 font-mono">Full Name</label>
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="bg-slate-900 border border-white/10 rounded-xl p-3 text-sm focus:border-cyan-400 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-slate-400 font-mono">Display Order</label>
                        <input
                          type="number"
                          value={editOrder}
                          onChange={(e) => setEditOrder(Number(e.target.value))}
                          className="bg-slate-900 border border-white/10 rounded-xl p-3 text-sm focus:border-cyan-400 outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-slate-400 font-mono">Role (English)</label>
                        <input
                          value={editRole}
                          onChange={(e) => setEditRole(e.target.value)}
                          className="bg-slate-900 border border-white/10 rounded-xl p-3 text-sm focus:border-cyan-400 outline-none"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-slate-400 font-mono">Role (Myanmar)</label>
                        <input
                          value={editRoleMm}
                          onChange={(e) => setEditRoleMm(e.target.value)}
                          className="bg-slate-900 border border-white/10 rounded-xl p-3 text-sm focus:border-cyan-400 outline-none"
                        />
                      </div>
                    </div>

                    {/* CHANGE IMAGE REPLACEMENT SUBSECTION */}
                    <div className="border border-white/10 rounded-xl p-3 bg-slate-900/50 space-y-3">
                      <span className="text-[11px] text-slate-400 font-mono block">Replace Profile Avatar Photo:</span>
                      
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-slate-950">
                          <Image src={editImage?.url || member.imageUrl} alt="Edit thumbnail" fill className="object-cover" />
                        </div>
                        {editImage && <span className="text-xs text-emerald-400 font-medium">✓ New photo loaded staging area</span>}
                      </div>

                      <div className="pt-2 border-t border-white/5">
                        <UploadDropzone
                          endpoint="memberImageUploader"
                          onClientUploadComplete={(res) => {
                            const file = res[0];
                            setEditImage({ url: file.url, key: file.key });
                            alert("New avatar image staging sequence ready.");
                          }}
                          onUploadError={(error: Error) => alert(`Upload Error: ${error.message}`)}
                          className="ut-label:text-cyan-400 ut-button:bg-cyan-500 ut-button:py-1.5 ut-button:text-xs border-white/5 bg-slate-950 py-2 h-28"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button type="submit" className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-slate-950 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition">
                        <Save size={13} /> Update Records
                      </button>
                      <button type="button" onClick={() => setEditingId(null)} className="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-slate-300 hover:bg-white/5 font-semibold transition">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}