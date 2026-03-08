"use client";

import { useRef, useState } from "react";
import formatMoney from "@/utils/formatMoney";
import Rating from "@/components/common/rating";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface VideoCardProps {
  posterSrc: string;
  title: string;
  price: string;
  duration: string;
  rating: number;
  _id: string;
  hideCta?: boolean;
  variant?: "default" | "compact";
}

const Video_card: React.FC<VideoCardProps> = ({
  posterSrc,
  title,
  price,
  duration,
  rating,
  hideCta = false,
  _id = "3",
  variant = "default",
}) => {
  const [ratingVal, setRatingVal] = useState<number>(rating);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isCompact = variant === "compact";

  const openInfo = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsInfoOpen(true);
  };

  const closeInfo = () => {
    closeTimerRef.current = setTimeout(() => {
      setIsInfoOpen(false);
    }, 120);
  };

  return (
    <Popover open={isInfoOpen} onOpenChange={setIsInfoOpen}>
      <PopoverTrigger asChild>
        <Link
          href={`/home/explore/overview/${_id}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
          // onMouseEnter={openInfo}
          // onMouseLeave={closeInfo}
          // onFocus={openInfo}
          // onBlur={closeInfo}
        >
          <article
            className={cn(
              "group grow overflow-hidden border border-border/70 bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl",
              isCompact ? "rounded-xl p-2.5" : "rounded-2xl p-3"
            )}
          >
            <div
              className={cn(
                "relative overflow-hidden",
                isCompact ? "aspect-[4/3] rounded-lg" : "aspect-[16/9] rounded-xl"
              )}
            >
              <Image
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                src={posterSrc}
                alt="Video Poster Image"
                fill
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <span
                className={cn(
                  "absolute right-2 top-2 rounded-full bg-black/65 text-xs font-medium text-white backdrop-blur-sm",
                  isCompact ? "px-2 py-0.5" : "px-2.5 py-1"
                )}
              >
                {duration}
              </span>
            </div>

            <div
              className={cn(
                isCompact ? "mt-2.5 flex flex-col gap-2" : "mt-3 flex flex-col gap-2.5",
                !hideCta && "mb-3"
              )}
            >
              <span
                className={cn(
                  "line-clamp-2 font-semibold leading-snug text-foreground",
                  isCompact ? "text-sm" : "text-[15px]"
                )}
              >
                {title}
              </span>

              <div className="flex items-center justify-between gap-2">
                <span className={cn("font-bold text-foreground", isCompact ? "text-base" : "text-lg")}>
                  &#8358;{formatMoney(price)}
                </span>
                <span
                  className={cn(
                    "font-medium uppercase tracking-wide text-muted-foreground",
                    isCompact ? "text-[10px]" : "text-xs"
                  )}
                >
                  Course
                </span>
              </div>

              <div
                className={cn(
                  "mt-0.5 flex w-fit items-center gap-1.5 rounded-full bg-muted/70",
                  isCompact ? "px-2 py-0.5" : "px-2.5 py-1"
                )}
              >
                <span className={cn("font-medium", isCompact ? "text-xs" : "text-sm")}>
                  {ratingVal.toFixed(1)}
                </span>
                <span className="-mt-0.5">
                  <Rating onChange={setRatingVal} value={ratingVal} />
                </span>
              </div>
            </div>
          </article>
        </Link>
      </PopoverTrigger>

      <PopoverContent
        align="center"
        sideOffset={10}
        className="hidden w-[20rem] rounded-xl border-border/60 bg-card/95 p-4 shadow-2xl backdrop-blur-sm md:block"
        onMouseEnter={openInfo}
        onMouseLeave={closeInfo}
      >
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
            Course Details
          </p>

          <div className="space-y-2 text-sm">
            <div className="grid grid-cols-[6rem_1fr] items-start gap-2">
              <span className="text-muted-foreground">Course Title</span>
              <span className="line-clamp-2 font-semibold text-foreground">{title}</span>
            </div>
            <div className="grid grid-cols-[6rem_1fr] items-center gap-2">
              <span className="text-muted-foreground">Price</span>
              <span className="font-semibold text-foreground">&#8358;{formatMoney(price)}</span>
            </div>
            <div className="grid grid-cols-[6rem_1fr] items-center gap-2">
              <span className="text-muted-foreground">Duration</span>
              <span className="font-medium text-foreground">{duration}</span>
            </div>
            <div className="grid grid-cols-[6rem_1fr] items-center gap-2">
              <span className="text-muted-foreground">Rating</span>
              <div className="flex items-center gap-1.5 rounded-md bg-muted/60 px-2 py-1">
                <span className="text-sm font-medium">{ratingVal.toFixed(1)}</span>
                <Rating onChange={setRatingVal} value={ratingVal} />
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Video_card;
