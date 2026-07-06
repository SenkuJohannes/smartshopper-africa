import JSZip from "jszip";

export interface PkPassFiles {
  pass: object;
  manifest: object;

  assets?: {
    icon?: Buffer;
    icon2x?: Buffer;
    logo?: Buffer;
    logo2x?: Buffer;
  };
}

export async function buildPkPass(
  files: PkPassFiles
): Promise<Buffer> {
  const zip = new JSZip();

  // Required Apple Wallet files
  zip.file(
    "pass.json",
    JSON.stringify(files.pass, null, 2)
  );

  zip.file(
    "manifest.json",
    JSON.stringify(files.manifest, null, 2)
  );

  // Optional branding assets
  if (files.assets?.icon) {
    zip.file("icon.png", files.assets.icon);
  }

  if (files.assets?.icon2x) {
    zip.file("icon@2x.png", files.assets.icon2x);
  }

  if (files.assets?.logo) {
    zip.file("logo.png", files.assets.logo);
  }

  if (files.assets?.logo2x) {
    zip.file("logo@2x.png", files.assets.logo2x);
  }

  // Signature will be added once Apple approves your account
  // zip.file("signature", signatureBuffer);

  return await zip.generateAsync({
    type: "nodebuffer",
    compression: "DEFLATE",
    compressionOptions: {
      level: 9,
    },
  });
}