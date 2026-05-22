// app/api/uploadthing/core.ts
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Activity အတွက် ဓာတ်ပုံအများအပြား (Max 6 ပုံ) လက်ခံမည့် FileRoute
  activityImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 6 } })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: "Admin", url: file.url, key: file.key };
    }),

  // Team Member အတွက် ပုံတစ်ပုံတည်းသာ လက်ခံမည့် FileRoute
  memberImageUploader: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .onUploadComplete(async ({ file }) => {
      return { url: file.url, key: file.key };
    }),
} satisfies FileRouter;

// 🌟 အဓိကအချက်: အရှေ့တွင် "export" ထည့်ပေးရန် မမေ့ပါနှင့်။
// ၎င်းမှသာ route.ts နှင့် utils/uploadthing.ts တို့က Type ကို လှမ်းသိမှာဖြစ်ပါတယ်
export type OurFileRouter = typeof ourFileRouter;