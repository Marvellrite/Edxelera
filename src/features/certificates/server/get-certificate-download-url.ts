import type { CertificateDownloadUrlResult } from "@/features/_shared/types";
import { signCloudFrontPath } from "@/lib/server/cloudfront";

export async function getCertificateDownloadUrl(certificateId: string): Promise<CertificateDownloadUrlResult> {
  // TODO: Lookup certificate ownership + file path in DB before signing.
  const signed = signCloudFrontPath(`certificates/${certificateId}.pdf`);
  return { certificateId, downloadUrl: signed.url, expiresAtUtc: signed.expiresAtUtc };
}