"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Star, Clock3, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { CartCourseItem } from "@/stores";
import formatMoney from "@/utils/formatMoney";

type CourseAddedToCartDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: CartCourseItem | null;
  alreadyInCart?: boolean;
};

export default function CourseAddedToCartDialog({
  open,
  onOpenChange,
  course,
  alreadyInCart = false,
}: CourseAddedToCartDialogProps) {
  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[min(94vw,500px)] overflow-hidden border-0 bg-transparent p-0 shadow-none"
      >
        <div className="relative overflow-hidden rounded-[28px] border border-white/45 bg-[linear-gradient(160deg,rgba(255,255,255,0.3),rgba(255,255,255,0.12))] shadow-[0_30px_80px_-30px_rgba(var(--primary-bare),0.55)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.08)_52%,rgba(77,107,255,0.14)_100%)]" />
          <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-primary-300/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-12 h-44 w-44 rounded-full bg-secondary-200/25 blur-3xl" />

          <div className="relative z-10 border-b border-white/55 bg-white/15 px-5 py-4 backdrop-blur-md">
            <div className="flex items-start justify-between gap-3">
              <div>
                <DialogTitle className="text-base font-semibold text-primary md:text-lg">
                  {alreadyInCart ? "Already in cart" : "Added to cart"}
                </DialogTitle>
                <DialogDescription className="mt-1 text-sm text-neutral-700">
                  {alreadyInCart
                    ? "This course is already in your cart."
                    : "Course has been added successfully."}
                </DialogDescription>
              </div>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Close add to cart confirmation"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/60 bg-white/60 text-neutral-700 transition hover:bg-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative z-10 px-5 py-4">
            <div className="rounded-2xl border border-white/60 bg-white/60 p-3 shadow-[0_14px_26px_-20px_rgba(var(--primary-bare),0.45)] backdrop-blur-md">
              <div className="flex items-start gap-3">
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border border-white/60">
                  <Image
                    src={course.posterSrc}
                    alt={course.title}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-semibold leading-snug text-neutral-900">
                    {course.title}
                  </p>
                  <div className="mt-1.5 flex items-center gap-3 text-xs text-neutral-700">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {course.rating.toFixed(1)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock3 className="h-3.5 w-3.5" />
                      {course.duration}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-bold text-primary">
                    &#8358;{formatMoney(course.price)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-secondary-200/70 bg-secondary-50/75 px-3 py-1 text-xs font-medium text-secondary-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {alreadyInCart ? "Course is ready in your cart" : "Course saved to your cart"}
            </div>
          </div>

          <div className="relative z-10 flex flex-col-reverse gap-2 border-t border-white/55 bg-white/14 px-5 py-4 backdrop-blur-md sm:flex-row sm:justify-end">
            {/* <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 rounded-full border-primary-200/80 bg-white/70 px-4 text-xs font-medium text-primary hover:bg-primary-50"
            >
              Continue Browsing
            </Button> */}
            <Button asChild type="button" className="h-10 rounded-full px-5 text-xs font-semibold">
              <Link href="/cart">Go to Cart</Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
