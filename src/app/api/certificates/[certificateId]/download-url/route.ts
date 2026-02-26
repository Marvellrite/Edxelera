import { NextResponse } from "next/server";
import { getCertificateDownloadUrl } from "@/features/certificates/server/get-certificate-download-url";

export async function GET(_req: Request, { params }: { params: Promise<{ certificateId: string }> }) {
  const { certificateId } = await params;
  const data = await getCertificateDownloadUrl(certificateId);
  return NextResponse.json({ ok: true, data });
}
