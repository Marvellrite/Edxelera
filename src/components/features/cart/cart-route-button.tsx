"use client";

import Link from "next/link";
import { Cart } from "@/components/icons/modified";
import { Badge } from "@/components/common";
import { useCartStore } from "@/stores";

type CartRouteButtonProps = {
  count?: number;
  className?: string;
};

export default function CartRouteButton({
  count,
  className = "",
}: CartRouteButtonProps) {
  const storeCount = useCartStore((state) => state.items.length);
  const itemCount = count ?? storeCount;

  return (
    <Link
      href="/cart"
      aria-label={`Open cart${itemCount > 0 ? `, ${itemCount} item${itemCount === 1 ? "" : "s"}` : ""}`}
      className={[
        "group relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
        "border border-primary-200/75 bg-[linear-gradient(160deg,rgba(255,255,255,0.78),rgba(238,242,255,0.88))]",
        "text-primary shadow-[0_10px_22px_-16px_rgba(var(--primary-bare),0.45)] backdrop-blur-md",
        "transition-[transform,border-color,background,box-shadow,color] duration-300 ease-out",
        "hover:-translate-y-[1px] hover:border-secondary-200 hover:bg-[linear-gradient(160deg,rgba(255,255,255,0.82),rgba(255,236,236,0.82))] hover:text-secondary-700 hover:shadow-[0_14px_24px_-16px_rgba(188,20,29,0.45)] active:translate-y-0 active:scale-[0.985]",
        "active:translate-y-0 active:scale-[0.985]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300 focus-visible:ring-offset-2",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[1.5px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0))]"
      />
      <Cart className="relative z-1 h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-[1.05] translate-x-0.5" />
      <Badge count={itemCount} className="right-0.5 top-0.5" />
    </Link>
  );
}
