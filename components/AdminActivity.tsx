"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "@/utils/uploadthing";
import { createActivity, deleteActivity, updateActivity } from "@/app/actions/activities";
import { Plus, ImagePlus, Trash2, Pencil, Save, X} from "lucide-react";
import Image from "next/image";

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

interface AdminActivityFormProps {
  initialActivities: ActivityRecord[];
}

export default function AdminActivityForm({ initialActivities }: AdminActivityFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");
  const [status, setStatus] = useState("");

  // Create Form States
  const [title, setTitle] = useState("");
  const [titleMm, setTitleMm] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedImages, setUploadedImages] = useState<ActivityImage[]>([]);

  // Edit Inline Form States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTitleMm, setEditTitleMm] = useState("");
  const [editSubTitle, setEditSubTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editImages, setEditImages] = useState<ActivityImage[]>([]);

  // 1. Handle Main Create Submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedImages.length === 0) {
      return alert("ကျေးဇူးပြု၍ အနည်းဆုံး ဓာတ်ပုံတစ်ပုံ တင်ပေးပါရန်။");
    }

    setStatus("Publishing activity...");
    try {
      await createActivity({ title, titleMm, subTitle, description, images: uploadedImages });
      setStatus("Successfully Created!");
      setTitle("");
      setTitleMm("");
      setSubTitle("");
      setDescription("");
      setUploadedImages([]);
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

  // 2. Trigger Edit and Fill States
  const startEdit = (activity: ActivityRecord) => {
    setEditingId(activity.id);
    setEditTitle(activity.title);
    setEditTitleMm(activity.titleMm);
    setEditSubTitle(activity.subTitle);
    setEditDescription(activity.description);
    setEditImages(activity.images || []); 
  };

  // 3. Handle Update Submission
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    if (editImages.length === 0) {
      return alert("ဓာတ်ပုံအားလုံး ဖျက်ပစ်လို့မရပါ။ အနည်းဆုံးတစ်ပုံ ရှိရပါမည်။");
    }

    setStatus("Updating database entry...");
    try {
      await updateActivity(editingId, {
        title: editTitle,
        titleMm: editTitleMm,
        subTitle: editSubTitle,
        description: editDescription,
        images: editImages as any, // TypeScript bypass
      });
      setStatus("Updated successfully!");
      setEditingId(null);
      startTransition(() => router.refresh());
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      alert("Update failed. Please try again.");
      setStatus("");
    }
  };

  // 4. Handle Master Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this activity?")) return;
    try {
      await deleteActivity(id);
      setStatus("Activity deleted.");
      startTransition(() => router.refresh());
      setTimeout(() => setStatus(""), 3000);
    } catch (error) {
      alert("Delete failed. Please try again.");
    }
  };

  // 5. Remove Single Image from Array
  const removeSingleImage = (indexToRemove: number, isEditing: boolean) => {
    if (isEditing) {
      setEditImages(editImages.filter((_, idx) => idx !== indexToRemove));
    } else {
      setUploadedImages(uploadedImages.filter((_, idx) => idx !== indexToRemove));
    }
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 md:p-8 max-w-5xl mx-auto text-white font-sans text-left space-y-6">
      
      {/* HEADER SECTION WITH TABS CONTROL */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h2 className="text-xl font-black tracking-tight flex items-center gap-2">
            Amara8 Control Hub
          </h2>
          <p className="text-xs text-slate-400 mt-1">Activities & Deployment Operations Admin</p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 self-start md:self-auto">
          <button
            onClick={() => setActiveTab("create")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "create" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Plus size={14} /> New Post
          </button>
          <button
            onClick={() => setActiveTab("manage")}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "manage" ? "bg-cyan-500 text-slate-950 shadow" : "text-slate-400 hover:text-white"
            }`}
          >
             Records ({initialActivities.length})
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
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm"
              placeholder="English Title"
            />
            <input
              type="text"
              required
              value={titleMm}
              onChange={(e) => setTitleMm(e.target.value)}
              className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm"
              placeholder="Myanmar Title"
            />
          </div>

          <input
            type="text"
            required
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm w-full"
            placeholder="Sub Title (e.g. Fiber Construction)"
          />

          <textarea
            rows={4}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm resize-none leading-relaxed w-full"
            placeholder="Detailed description..."
          />

          {/* Create mode images uploader */}
          <div className="border border-white/10 bg-slate-950/40 rounded-xl p-4 space-y-4">
            <UploadDropzone
              endpoint="activityImageUploader"
              onClientUploadComplete={(res) => {
                const formatted = res.map((file) => ({ url: file.url, key: file.key }));
                setUploadedImages((prev) => [...prev, ...formatted]);
              }}
              className="ut-label:text-cyan-400 border-white/5 bg-slate-950"
            />

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                {uploadedImages.map((img, index) => (
                  <div key={img.key} className="relative group rounded-xl overflow-hidden border border-white/10 aspect-video bg-slate-900 shadow">
                    <Image src={img.url} alt="preview" fill className="object-cover" />
                    <button type="button" onClick={() => removeSingleImage(index, false)} className="absolute top-1 right-1 p-1 bg-rose-600/90 hover:bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition">
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button type="submit" className="w-full bg-cyan-500 text-slate-950 text-xs font-bold py-4 rounded-xl hover:opacity-90 transition">
            Publish Activity
          </button>
        </form>
      )}

      {/* TAB 2: RECORDS MANAGEMENT (Scalability System) */}
      {activeTab === "manage" && (
        <div className="space-y-4 relative">
          {initialActivities.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">No operational records found.</div>
          ) : (
            initialActivities.map((activity) => (
              <div key={activity.id} className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 space-y-4">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base md:text-lg font-bold text-white">{activity.title}</h4>
                    <p className="text-xs text-cyan-400 font-mono tracking-wider uppercase mt-0.5">{activity.subTitle}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-slate-400 shrinking-0">
                    <button type="button" onClick={() => startEdit(activity)} className="flex items-center gap-1.5 rounded-lg border border-cyan-500/30 px-3 py-1.5 text-cyan-400 hover:bg-cyan-500/10 transition">
                      <Pencil size={13} /> Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(activity.id)} className="flex items-center gap-1.5 rounded-lg border border-rose-500/20 px-3 py-1.5 text-rose-400 hover:bg-rose-500/10 transition">
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">{activity.description}</p>

                {activity.images && activity.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {activity.images.map((img) => (
                      <div key={img.key} className="relative w-14 h-11 rounded-lg overflow-hidden border border-white/5 bg-slate-900">
                        <Image src={img.url} alt="Attached image" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                )}

                {/* INLINE EDIT FORM MODE (TAB 2 INSIDE) */}
                {editingId === activity.id && (
                  <form onSubmit={handleUpdate} className="space-y-4 border-t border-white/10 pt-5 mt-4 bg-slate-950/60 p-4 rounded-xl">
                    <h5 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2 mb-3">
                      <Pencil size={13} /> Edit Activity Details
                    </h5>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-xl p-3 text-sm focus:border-cyan-400 outline-none"
                        placeholder="English Title"
                      />
                      <input
                        value={editTitleMm}
                        onChange={(e) => setEditTitleMm(e.target.value)}
                        className="bg-slate-900 border border-white/10 rounded-xl p-3 text-sm focus:border-cyan-400 outline-none"
                        placeholder="Myanmar Title"
                      />
                    </div>

                    <input
                      value={editSubTitle}
                      onChange={(e) => setEditSubTitle(e.target.value)}
                      className="bg-slate-900 border border-white/10 rounded-xl p-3 text-sm w-full focus:border-cyan-400 outline-none"
                      placeholder="Sub Title"
                    />

                    <textarea
                      rows={3}
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="bg-slate-900 border border-white/10 rounded-xl p-3 text-sm w-full focus:border-cyan-400 outline-none resize-none leading-relaxed"
                      placeholder="Description"
                    />

                    {/* 🌟 FIX: EDIT IMAGE PREVIEWS & ADD IMAGE LOGIC (THIS IS TAB 2) */}
                    <div className="border border-white/10 rounded-xl p-3 bg-slate-900/50 space-y-3">
                      <span className="text-[11px] text-slate-400 font-mono block mb-3">Linked Gallery Images:</span>
                      
                      {editImages.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-4">
                          {editImages.map((img, index) => (
                            <div key={img.key} className="relative group aspect-video rounded-lg overflow-hidden border border-white/10 bg-slate-950 shadow">
                              <Image src={img.url} alt="edit-preview" fill className="object-cover" />
                              <button
                                type="button"
                                onClick={() => removeSingleImage(index, true)}
                                className="absolute top-0.5 right-0.5 p-1 bg-rose-600 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={10} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 🌟 FIX: Tab 2 (Manage Tab) ထဲက Dropzone function ကို Edit state သို့ ညွှန်ပြခြင်း */}
                      <div className="pt-2 border-t border-white/5">
                        <UploadDropzone
                          endpoint="activityImageUploader"
                          onClientUploadComplete={(res) => {
                            const formatted = res.map((file) => ({ url: file.url, key: file.key }));
                            // ❌ uploadedImages အစား ( Create tab အတွက် state)
                            //  editImages ကို ပြောင်းသုံးလိုက်ပါတယ် ( Edit tab အတွက် state)
                            setEditImages((prev) => [...prev, ...formatted]); 
                          }}
                          className="ut-label:text-cyan-400 border-white/5 bg-slate-950 py-2 h-28"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button type="submit" className="flex items-center gap-1.5 rounded-xl bg-cyan-500 px-4 py-2.5 text-slate-950 text-xs font-bold uppercase hover:opacity-90 transition">
                        <Save size={13} /> Save Modifications
                      </button>
                      <button type="button" onClick={() => setEditingId(null)} className="rounded-xl border border-white/10 px-4 py-2.5 text-xs text-slate-300 hover:bg-white/5transition">
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