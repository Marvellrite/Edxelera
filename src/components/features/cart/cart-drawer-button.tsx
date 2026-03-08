"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock3,
  ChevronRight,
  Star,
  ShoppingCart,
  Trash2,
  ImageIcon,
} from "lucide-react";
import { Cart } from "@/components/icons/modified";
import Badge from "@/components/common/badge";
import formatMoney from "@/utils/formatMoney";
import { useCartStore } from "@/stores/cart-store";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CartCourseItem = {
  id: string;
  image: string;
  title: string;
  price: number;
  duration: string;
  rating?: number;
  reviewsCount?: number;
};

type CartDrawerButtonProps = {
  count?: number;
  items?: CartCourseItem[];
  onOpen?: () => void;
  onRemoveItem?: (id: string) => void;
};

export default function CartDrawerButton({
  count,
  items,
  onOpen,
  onRemoveItem,
}: CartDrawerButtonProps) {
  const [mounted, setMounted] = React.useState(false);
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});
  const storeItems = useCartStore((state) => state.items);
  const removeCourse = useCartStore((state) => state.removeCourse);
  const derivedItems = React.useMemo<CartCourseItem[]>(
    () =>
      storeItems.map((item, index) => ({
        id: item._id,
        image: item.posterSrc,
        title: item.title,
        price: Number(item.price),
        duration: item.duration,
        rating: item.rating,
        reviewsCount: 120 + index * 23,
      })),
    [storeItems]
  );
  const resolvedItems = items ?? derivedItems;
  const itemCount = count ?? resolvedItems.length;
  const hasItems = resolvedItems.length > 0;
  const subtotal = resolvedItems.reduce((sum, item) => sum + item.price, 0);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const markImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const triggerButton = (
    <button
      type="button"
      className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center"
      aria-label="Cart"
    >
      <Cart className="h-7 w-7 text-[#001146]" />
      <Badge count={itemCount} />
    </button>
  );

  if (!mounted) return triggerButton;

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) onOpen?.();
      }}
    >
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="top-0 right-0 left-auto h-dvh w-[min(95vw,430px)] max-w-none translate-x-0 translate-y-0 gap-0 rounded-none border-l border-white/30 bg-white/18 p-0 shadow-[0_35px_120px_-30px_rgba(5,11,32,0.55)] backdrop-blur-xl data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-right-full data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0"
      >
        <div className="relative flex h-full flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_45%_at_92%_0%,hsl(var(--primary)/0.22),transparent),radial-gradient(85%_60%_at_0%_100%,hsl(var(--primary)/0.1),transparent)]" />

          <div className="relative z-10 flex items-center justify-between border-b border-white/30 px-5 py-4">
            <div>
              <DialogTitle className="text-base font-semibold text-neutral-900 md:text-lg">
                Your Cart
              </DialogTitle>
              <DialogDescription className="text-xs text-neutral-700">
                {itemCount} {itemCount === 1 ? "course" : "courses"} selected
              </DialogDescription>
            </div>
            <DialogClose className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/55 text-neutral-800 transition-colors hover:bg-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40">
              <span className="sr-only">Close cart</span>
              <ChevronRight className="h-4 w-4 rotate-180" />
            </DialogClose>
          </div>

          <div className="relative z-10 flex-1 overflow-y-auto px-4 py-4">
            {hasItems ? (
              <div className="space-y-3 pr-1">
                {resolvedItems.map((item) => {
                  const rating = item.rating ?? 0;
                  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-white/45 bg-white/55 p-3 shadow-[0_18px_35px_-24px_rgba(0,0,0,0.5)] backdrop-blur-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-white/50 bg-white/60">
                          {imageErrors[item.id] ? (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-500">
                              <ImageIcon className="h-5 w-5" />
                            </div>
                          ) : (
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="112px"
                              onError={() => markImageError(item.id)}
                            />
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900">
                            {item.title}
                          </p>

                          <div className="mt-1.5 flex items-center gap-2 text-xs text-neutral-700">
                            <span className="inline-flex items-center gap-1">
                              <Clock3 className="h-3.5 w-3.5" />
                              {item.duration}
                            </span>
                          </div>

                          <div className="mt-1.5 flex items-center gap-1 text-amber-500">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={`${item.id}-star-${i}`}
                                className={`h-3.5 w-3.5 ${i < roundedRating ? "fill-current" : "text-neutral-300"}`}
                              />
                            ))}
                            <span className="ml-1 text-xs font-medium text-neutral-800">
                              {rating.toFixed(1)}
                            </span>
                            {typeof item.reviewsCount === "number" && (
                              <span className="text-[11px] text-neutral-500">
                                ({item.reviewsCount.toLocaleString()})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm font-bold text-primary">
                          &#8358;{formatMoney(String(item.price))}
                        </p>
                        {onRemoveItem || !items ? (
                          <button
                            type="button"
                            onClick={() => {
                              if (onRemoveItem) onRemoveItem(item.id);
                              else removeCourse(item.id);
                            }}
                            aria-label={`Remove ${item.title} from cart`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/25 bg-white/70 text-primary transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex h-full min-h-[52dvh] flex-col items-center justify-center rounded-2xl border border-dashed border-white/45 bg-white/45 px-6 text-center backdrop-blur-sm">
                <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ShoppingCart className="h-6 w-6" />
                </div>
                <p className="text-base font-semibold text-neutral-900">
                  Your cart is empty
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  Add courses to your cart to see them here and checkout quickly.
                </p>
                <DialogClose asChild>
                  <button
                    type="button"
                    className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-primary/30 bg-white/65 px-4 text-xs font-semibold text-primary transition hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    Continue Browsing
                  </button>
                </DialogClose>
              </div>
            )}
          </div>

          <div className="relative z-10 border-t border-white/30 bg-white/50 p-4 backdrop-blur-sm">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-neutral-700">Subtotal</span>
              <span className="font-bold text-neutral-900">
                &#8358;{formatMoney(String(subtotal))}
              </span>
            </div>

            <div className="grid gap-2">
              <Link
                href="/cart"
                aria-disabled={!hasItems}
                className={`inline-flex h-11 items-center justify-center rounded-full text-sm font-semibold text-white transition ${
                  hasItems ? "bg-primary hover:brightness-95" : "pointer-events-none bg-neutral-400"
                }`}
              >
                {hasItems ? "Proceed to Checkout" : "Add Courses to Continue"}
              </Link>
              <DialogClose asChild>
                <button
                  type="button"
                  className="inline-flex h-10 items-center justify-center rounded-full border border-primary/30 bg-white/70 text-xs font-semibold text-primary transition hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  Continue Browsing
                </button>
              </DialogClose>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
