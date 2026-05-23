"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Plus,
  Trash2,
  Pencil,
  Save,
  X,
} from "lucide-react";

import { UploadDropzone } from "@/utils/uploadthing";

import {
  createActivity,
  deleteActivity,
  updateActivity,
} from "@/app/actions/activities";

import { activitySchema } from "@/lib/validation/activity";

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

export default function AdminActivityForm({
  initialActivities,
}: AdminActivityFormProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [activeTab, setActiveTab] =
    useState<"create" | "manage">("create");

  const [status, setStatus] = useState("");

  const [errors, setErrors] = useState<
    Record<string, string>
  >({});

  // =========================
  // CREATE STATES
  // =========================

  const [title, setTitle] = useState("");
  const [titleMm, setTitleMm] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] =
    useState("");

  const [uploadedImages, setUploadedImages] =
    useState<ActivityImage[]>([]);

  // =========================
  // EDIT STATES
  // =========================

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editTitle, setEditTitle] =
    useState("");

  const [editTitleMm, setEditTitleMm] =
    useState("");

  const [editSubTitle, setEditSubTitle] =
    useState("");

  const [editDescription, setEditDescription] =
    useState("");

  const [editImages, setEditImages] =
    useState<ActivityImage[]>([]);

  // =========================
  // INPUT STYLE
  // =========================

  const inputStyle = (field: string) => `
    bg-slate-950 border rounded-xl px-4 py-3 text-sm
    focus:outline-none transition-colors
    ${
      errors[field]
        ? "border-red-500 focus:border-red-500"
        : "border-white/10 focus:border-cyan-400"
    }
  `;

  // =========================
  // CREATE
  // =========================

  const handleFormSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setErrors({});
    setStatus("");

    const validated = activitySchema.safeParse({
      title,
      titleMm,
      subTitle,
      description,
      images: uploadedImages,
    });

    if (!validated.success) {
      const fieldErrors: Record<
        string,
        string
      > = {};

      validated.error.issues.forEach((err) => {
        const field = err.path[0] as string;

        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);

      return;
    }

    setStatus("Publishing activity...");

    try {
      await createActivity(validated.data);

      setStatus("Successfully created!");

      setTitle("");
      setTitleMm("");
      setSubTitle("");
      setDescription("");
      setUploadedImages([]);

      startTransition(() => router.refresh());

      setTimeout(() => {
        setStatus("");
        setActiveTab("manage");
      }, 1500);
    } catch {
      setErrors({
        server:
          "Create failed. Please try again.",
      });

      setStatus("");
    }
  };

  // =========================
  // START EDIT
  // =========================

  const startEdit = (
    activity: ActivityRecord
  ) => {
    setEditingId(activity.id);

    setEditTitle(activity.title);

    setEditTitleMm(activity.titleMm);

    setEditSubTitle(activity.subTitle);

    setEditDescription(activity.description);

    setEditImages(activity.images || []);
  };

  // =========================
  // UPDATE
  // =========================

  const handleUpdate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!editingId) return;

    setErrors({});
    setStatus("");

    const validated = activitySchema.safeParse({
      title: editTitle,
      titleMm: editTitleMm,
      subTitle: editSubTitle,
      description: editDescription,
      images: editImages,
    });

    if (!validated.success) {
      const fieldErrors: Record<
        string,
        string
      > = {};

      validated.error.issues.forEach((err) => {
        const field = err.path[0] as string;

        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);

      return;
    }

    setStatus("Updating activity...");

    try {
      await updateActivity(
        editingId,
        validated.data
      );

      setStatus("Updated successfully!");

      setEditingId(null);

      startTransition(() => router.refresh());

      setTimeout(() => {
        setStatus("");
      }, 2000);
    } catch {
      setErrors({
        server:
          "Update failed. Please try again.",
      });

      setStatus("");
    }
  };

  // =========================
  // DELETE
  // =========================

  const handleDelete = async (id: string) => {
    const confirmed = confirm(
      "Delete this activity?"
    );

    if (!confirmed) return;

    try {
      await deleteActivity(id);

      setStatus("Activity deleted.");

      startTransition(() => router.refresh());

      setTimeout(() => {
        setStatus("");
      }, 2000);
    } catch {
      setErrors({
        server:
          "Delete failed. Please try again.",
      });
    }
  };

  // =========================
  // REMOVE IMAGE
  // =========================

  const removeSingleImage = (
    indexToRemove: number,
    isEditing: boolean
  ) => {
    if (isEditing) {
      setEditImages(
        editImages.filter(
          (_, idx) => idx !== indexToRemove
        )
      );
    } else {
      setUploadedImages(
        uploadedImages.filter(
          (_, idx) => idx !== indexToRemove
        )
      );
    }
  };

  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 md:p-8 max-w-5xl mx-auto text-white font-sans text-left space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-5">
        <div>
          <h2 className="text-xl font-black tracking-tight">
            Amara8 Control Hub
          </h2>

          <p className="text-xs text-slate-400 mt-1">
            Activities & Deployment Operations
            Admin
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5">
          <button
            onClick={() =>
              setActiveTab("create")
            }
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "create"
                ? "bg-cyan-500 text-slate-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Plus size={14} />
            New Post
          </button>

          <button
            onClick={() =>
              setActiveTab("manage")
            }
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === "manage"
                ? "bg-cyan-500 text-slate-950"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Records ({initialActivities.length})
          </button>
        </div>
      </div>

      {/* STATUS */}
      {status && (
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-sm">
          {status}
        </div>
      )}

      {/* SERVER ERROR */}
      {errors.server && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl p-4">
          {errors.server}
        </div>
      )}

      {/* ========================= */}
      {/* CREATE TAB */}
      {/* ========================= */}

      {activeTab === "create" && (
        <form
          onSubmit={handleFormSubmit}
          className="space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                className={inputStyle("title")}
                placeholder="English Title"
              />

              {errors.title && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.title}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                value={titleMm}
                onChange={(e) =>
                  setTitleMm(e.target.value)
                }
                className={inputStyle("titleMm")}
                placeholder="Myanmar Title"
              />

              {errors.titleMm && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.titleMm}
                </p>
              )}
            </div>
          </div>

          <div>
            <input
              type="text"
              value={subTitle}
              onChange={(e) =>
                setSubTitle(e.target.value)
              }
              className={`${inputStyle(
                "subTitle"
              )} w-full`}
              placeholder="Sub Title"
            />

            {errors.subTitle && (
              <p className="text-red-400 text-xs mt-1">
                {errors.subTitle}
              </p>
            )}
          </div>

          <div>
            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className={`${inputStyle(
                "description"
              )} resize-none leading-relaxed w-full`}
              placeholder="Detailed description..."
            />

            {errors.description && (
              <p className="text-red-400 text-xs mt-1">
                {errors.description}
              </p>
            )}
          </div>

          {/* UPLOAD */}
          <div className="border border-white/10 bg-slate-950/40 rounded-xl p-4 space-y-4">
            <UploadDropzone
              endpoint="activityImageUploader"
              onClientUploadComplete={(res) => {
                const formatted = res.map(
                  (file) => ({
                    url: file.url,
                    key: file.key,
                  })
                );

                setUploadedImages((prev) => [
                  ...prev,
                  ...formatted,
                ]);
              }}
              className="ut-label:text-cyan-400 border-white/5 bg-slate-950"
            />

            {errors.images && (
              <p className="text-red-400 text-xs">
                {errors.images}
              </p>
            )}

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {uploadedImages.map(
                  (img, index) => (
                    <div
                      key={img.key}
                      className="relative group aspect-video rounded-xl overflow-hidden border border-white/10"
                    >
                      <Image
                        src={img.url}
                        alt="preview"
                        fill
                        className="object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeSingleImage(
                            index,
                            false
                          )
                        }
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-cyan-500 disabled:opacity-50 text-slate-950 text-xs font-bold py-4 rounded-xl hover:opacity-90 transition"
          >
            {isPending
              ? "Publishing..."
              : "Publish Activity"}
          </button>
        </form>
      )}

      {/* ========================= */}
      {/* MANAGE TAB */}
      {/* ========================= */}

      {activeTab === "manage" && (
        <div className="space-y-4">
          {initialActivities.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No operational records found.
            </div>
          ) : (
            initialActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-slate-950/40 border border-white/10 rounded-2xl p-5 space-y-4"
              >
                {/* TOP */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base md:text-lg font-bold text-white">
                      {activity.title}
                    </h4>

                    <p className="text-xs text-cyan-400 font-mono uppercase tracking-wider mt-1">
                      {activity.subTitle}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        startEdit(activity)
                      }
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition"
                    >
                      <Pencil size={13} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(activity.id)
                      }
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition"
                    >
                      <Trash2 size={13} />
                      Delete
                    </button>
                  </div>
                </div>

                {/* DESCRIPTION */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activity.description}
                </p>

                {/* IMAGES */}
                {activity.images?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {activity.images.map((img) => (
                      <div
                        key={img.key}
                        className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10"
                      >
                        <Image
                          src={img.url}
                          alt="activity"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* EDIT MODE */}
                {editingId === activity.id && (
                  <form
                    onSubmit={handleUpdate}
                    className="space-y-4 border-t border-white/10 pt-5"
                  >
                    <input
                      value={editTitle}
                      onChange={(e) =>
                        setEditTitle(
                          e.target.value
                        )
                      }
                      className={`${inputStyle(
                        "title"
                      )} w-full`}
                      placeholder="English Title"
                    />

                    <input
                      value={editTitleMm}
                      onChange={(e) =>
                        setEditTitleMm(
                          e.target.value
                        )
                      }
                      className={`${inputStyle(
                        "titleMm"
                      )} w-full`}
                      placeholder="Myanmar Title"
                    />

                    <input
                      value={editSubTitle}
                      onChange={(e) =>
                        setEditSubTitle(
                          e.target.value
                        )
                      }
                      className={`${inputStyle(
                        "subTitle"
                      )} w-full`}
                      placeholder="Sub Title"
                    />

                    <textarea
                      rows={4}
                      value={editDescription}
                      onChange={(e) =>
                        setEditDescription(
                          e.target.value
                        )
                      }
                      className={`${inputStyle(
                        "description"
                      )} w-full resize-none`}
                      placeholder="Description"
                    />

                    {/* EDIT IMAGES */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {editImages.map(
                          (img, index) => (
                            <div
                              key={img.key}
                              className="relative group aspect-video rounded-xl overflow-hidden border border-white/10"
                            >
                              <Image
                                src={img.url}
                                alt="preview"
                                fill
                                className="object-cover"
                              />

                              <button
                                type="button"
                                onClick={() =>
                                  removeSingleImage(
                                    index,
                                    true
                                  )
                                }
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          )
                        )}
                      </div>

                      <UploadDropzone
                        endpoint="activityImageUploader"
                        onClientUploadComplete={(
                          res
                        ) => {
                          const formatted =
                            res.map((file) => ({
                              url: file.url,
                              key: file.key,
                            }));

                          setEditImages(
                            (prev) => [
                              ...prev,
                              ...formatted,
                            ]
                          );
                        }}
                        className="ut-label:text-cyan-400 border-white/5 bg-slate-950"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="submit"
                        className="flex items-center gap-2 bg-cyan-500 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold"
                      >
                        <Save size={13} />
                        Save
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setEditingId(null)
                        }
                        className="border border-white/10 px-4 py-2 rounded-xl text-xs hover:bg-white/5 transition"
                      >
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