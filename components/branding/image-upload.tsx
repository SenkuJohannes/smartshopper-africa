"use client";

import { ChangeEvent, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type ImageUploadProps = {
  programId: string;
  label: string;
  folder: "logo" | "banner";
  currentUrl?: string | null;
  onUpload: (url: string) => void;
};

export default function ImageUpload({
  programId,
  label,
  folder,
  currentUrl,
  onUpload,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    // Optional: limit file size to 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5MB.");
      return;
    }

    setUploading(true);

    try {
      const extension = file.name.split(".").pop()?.toLowerCase() || "png";

      const filePath = `${programId}/${folder}.${extension}`;

      console.log("Uploading file...");
      console.log("Bucket:", "branding");
      console.log("Path:", filePath);

      const { data, error } = await supabase.storage
        .from("branding")
        .upload(filePath, file, {
          upsert: true,
        });

      if (error) {
        console.error("Supabase Upload Error:", error);
        throw error;
      }

      console.log("Upload successful:", data);

      const { data: publicUrlData } = supabase.storage
        .from("branding")
        .getPublicUrl(filePath);

      console.log("Public URL:", publicUrlData.publicUrl);

      onUpload(publicUrlData.publicUrl);

      alert("Image uploaded successfully!");
    } catch (err: any) {
      console.error("Upload Failed:", err);

      alert(
        err?.message ||
          err?.error_description ||
          JSON.stringify(err) ||
          "Failed to upload image."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <label className="block font-medium">
        {label}
      </label>

      {currentUrl && (
        <img
          src={currentUrl}
          alt={label}
          className="h-24 w-24 rounded-xl border object-cover"
        />
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="block w-full text-sm"
      />

      {uploading && (
        <p className="text-sm text-green-600">
          Uploading image...
        </p>
      )}
    </div>
  );
}