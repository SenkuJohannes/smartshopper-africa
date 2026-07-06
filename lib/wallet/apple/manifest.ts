import { createHash } from "crypto";

export interface ManifestFiles {
  [filename: string]: Buffer | string;
}

export interface ManifestResult {
  [filename: string]: string;
}

export function buildManifest(
  files: ManifestFiles
): ManifestResult {
  const manifest: ManifestResult = {};

  for (const [filename, content] of Object.entries(files)) {
    const hash = createHash("sha1");

    if (typeof content === "string") {
      hash.update(content, "utf8");
    } else {
      hash.update(content);
    }

    manifest[filename] = hash.digest("hex");
  }

  return manifest;
}