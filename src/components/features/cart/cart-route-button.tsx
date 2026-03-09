"use client";

import Link from "next/link";
import { Cart } from "@/components/icons/modified";
import Badge from "@/components/common/badge";
import { useCartStore } from "@/stores/cart-store";

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
        "hover:-translate-y-[1px] hover:border-primary-300/85 hover:bg-[linear-gradient(160deg,rgba(255,255,255,0.86),rgba(218,228,255,0.9))] hover:text-primary-500 hover:shadow-[0_14px_26px_-18px_rgba(var(--primary-bare),0.55)]",
        "active:translate-y-0 active:scale-[0.985]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2",
        className,
      ].join(" ")}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-[1.5px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.45),rgba(255,255,255,0))]"
      />
      <Cart className="relative z-[1] h-5 w-5 transition-transform duration-300 ease-out group-hover:scale-[1.05]" />
      <Badge count={itemCount} className="right-0.5 top-0.5" />
    </Link>
  );
}
