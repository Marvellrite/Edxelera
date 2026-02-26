import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light" | "icon";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { width: 32, height: 32 },
  md: { width: 40, height: 40 },
  lg: { width: 48, height: 48 },
};

const iconSizeMap = {
  sm: { width: 24, height: 24 },
  md: { width: 32, height: 32 },
  lg: { width: 40, height: 40 },
};

export function Logo({
  variant = "dark",
  size = "md",
  className = "",
}: LogoProps) {
  if (variant === "icon") {
    const iconSize = iconSizeMap[size];
    return (
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-icon-7OpixWb6hBLyAXHQ6mxuXuGUcjQeaX.png"
        alt="EdXelera"
        width={iconSize.width}
        height={iconSize.height}
        className={`object-contain ${className}`}
        priority
      />
    );
  }

  const src =
    variant === "light"
      ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-full-light-TXkedHI1aUV81SCULsTZ2kW1ext403.png"
      : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-full-dark-MBDurbhK9c77ebOyzd5ygmRb5kgx5T.png";

  return (
    <Image
      src={src}
      alt="EdXelera"
      width={200}
      height={60}
      className={`object-contain ${className}`}
      priority
    />
  );
}

export function Wordmark({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div className={`text-2xl font-bold text-primary ${className}`}>
      EdXelera
    </div>
  );
}
