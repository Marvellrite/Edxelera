import Image from "next/image";

type EdxeleraLogoProps = {
  src?: string;
  priority?: boolean;
};

export function EdxeleraLogo({ src, priority = true }: EdxeleraLogoProps) {
  if (src) {
    return (
      <div className="relative h-10 w-[214.63px] shrink-0">
        <Image
          src={src}
          alt="Edxelera"
          fill
          sizes="215px"
          className="object-contain object-left"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="grid h-10 w-10 place-items-center rounded-full bg-[var(--color-primary)] text-white"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        e
      </span>
      <span
        className="text-[clamp(2rem,2.3vw,3rem)] font-medium leading-none tracking-[-0.04em]"
        style={{
          color: "var(--color-text-default)",
          fontFamily: "var(--font-google-sans)",
        }}
      >
        edxelera
      </span>
    </div>
  );
}
