// utils/uploadthing.ts
import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

// သင့်လုပ်ငန်းခွင်သုံး Form များတွင် ယူသုံးနိုင်ရန် Component များ ထုတ်ပေးခြင်း
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();