"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import BrandingPreview from "./branding-preview";
import ImageUpload from "./image-upload";

type Program = {
  id: string;
  name: string;
  description: string | null;

  logo_url: string | null;
  banner_url: string | null;

  primary_color: string;
  secondary_color: string;

  welcome_message: string | null;

  website: string | null;
  business_phone: string | null;
  business_address: string | null;
};

export default function BrandingForm({
  programId,
}: {
  programId: string;
}) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    loadProgram();
  }, []);

  async function loadProgram() {
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .eq("id", programId)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setProgram(data);
    setLoading(false);
  }

  async function saveBranding() {
    if (!program) return;

    setSaving(true);

    const { error } = await supabase
      .from("programs")
      .update({
        name: program.name,
        logo_url: program.logo_url,
        banner_url: program.banner_url,
        primary_color: program.primary_color,
        secondary_color: program.secondary_color,
        welcome_message: program.welcome_message,
        website: program.website,
        business_phone: program.business_phone,
        business_address: program.business_address,
      })
      .eq("id", programId);

    setSaving(false);

    if (error) {
      console.error(error);
      alert("Failed to save branding.");
      return;
    }

    alert("Branding saved successfully.");
  }

  if (loading || !program) {
    return (
      <div className="text-center py-20 text-lg">
        Loading branding...
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* LEFT */}

      <div className="bg-white rounded-2xl shadow p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Branding</h1>

            <p className="text-gray-500 mt-1">
              Customize your loyalty experience.
            </p>
          </div>

          <button
            onClick={saveBranding}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-5 py-3 rounded-xl transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        <div className="space-y-6">
          {/* Logo Upload */}

          <ImageUpload
            programId={programId}
            label="Business Logo"
            folder="logo"
            currentUrl={program.logo_url}
            onUpload={(url) =>
              setProgram({
                ...program,
                logo_url: url,
              })
            }
          />

          {/* Banner Upload */}

          <ImageUpload
            programId={programId}
            label="Banner Image"
            folder="banner"
            currentUrl={program.banner_url}
            onUpload={(url) =>
              setProgram({
                ...program,
                banner_url: url,
              })
            }
          />

          {/* Business Name */}

          <div>
            <label className="font-medium block mb-2">
              Business Name
            </label>

            <input
              value={program.name}
              onChange={(e) =>
                setProgram({
                  ...program,
                  name: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Welcome Message */}

          <div>
            <label className="font-medium block mb-2">
              Welcome Message
            </label>

            <textarea
              rows={3}
              value={program.welcome_message ?? ""}
              onChange={(e) =>
                setProgram({
                  ...program,
                  welcome_message: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Website */}

          <div>
            <label className="font-medium block mb-2">
              Website
            </label>

            <input
              value={program.website ?? ""}
              onChange={(e) =>
                setProgram({
                  ...program,
                  website: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Phone */}

          <div>
            <label className="font-medium block mb-2">
              Phone
            </label>

            <input
              value={program.business_phone ?? ""}
              onChange={(e) =>
                setProgram({
                  ...program,
                  business_phone: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Address */}

          <div>
            <label className="font-medium block mb-2">
              Address
            </label>

            <textarea
              rows={3}
              value={program.business_address ?? ""}
              onChange={(e) =>
                setProgram({
                  ...program,
                  business_address: e.target.value,
                })
              }
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>
        </div>
      </div>

      {/* RIGHT */}

      <BrandingPreview program={program} />
    </div>
  );
}