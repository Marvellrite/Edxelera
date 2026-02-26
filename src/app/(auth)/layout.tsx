import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const features = [
    { label: "Structured cohort programs" },
    { label: "Live sessions with instructors" },
    { label: "Peer community & discussions" },
    { label: "Certificates upon completion" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ── */}
      <div
        className="hidden lg:flex lg:w-5/12 xl:w-2/5 flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, var(--color-brand-primary-700) 0%, var(--color-brand-primary-800) 100%)",
        }}
      >
        {/* Subtle geometric pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,17,70,0.3) 0%, transparent 60%)",
          }}
        />
        {/* Grid dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-full-light-TXkedHI1aUV81SCULsTZ2kW1ext403.png"
              alt="EdXelera"
              width={160}
              height={48}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-white text-balance leading-snug mb-4">
              Learn together.<br />Grow faster.
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
              EdXelera's cohort-based model keeps you accountable, connected, and on track — from week one through certification.
            </p>
          </div>

          <ul className="space-y-3">
            {features.map((f) => (
              <li key={f.label} className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff" }}
                >
                  ✓
                </span>
                <span className="text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                  {f.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom quote */}
        <div className="relative z-10">
          <p className="text-sm italic" style={{ color: "rgba(255,255,255,0.4)" }}>
            "Structure is the foundation of mastery."
          </p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div
        className="flex-1 flex flex-col"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        {/* Mobile logo */}
        <div className="lg:hidden px-6 pt-6">
          <Link href="/">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-full-dark-MBDurbhK9c77ebOyzd5ygmRb5kgx5T.png"
              alt="EdXelera"
              width={140}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
