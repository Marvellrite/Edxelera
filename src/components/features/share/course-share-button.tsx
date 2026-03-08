"use client";

import * as React from "react";
import {
  Share2,
  Copy,
  Check,
  MessageCircle,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CourseShareButtonProps = {
  courseTitle?: string;
  shareUrl?: string;
};

type SocialAction = {
  key: "whatsapp" | "twitter" | "linkedin" | "facebook" | "email" | "instagram";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  helperText?: string;
};

export default function CourseShareButton({
  courseTitle = "Check out this course on Edxelera",
  shareUrl,
}: CourseShareButtonProps) {
  const [copied, setCopied] = React.useState(false);
  const [copyMessage, setCopyMessage] = React.useState("");
  const [currentUrl, setCurrentUrl] = React.useState("");
  const [canNativeShare, setCanNativeShare] = React.useState(false);

  React.useEffect(() => {
    const resolvedUrl =
      shareUrl?.trim() ||
      (typeof window !== "undefined" ? window.location.href : "");

    setCurrentUrl(resolvedUrl);
    setCanNativeShare(
      typeof navigator !== "undefined" &&
        typeof navigator.share === "function"
    );
  }, [shareUrl]);

  const encodedTitle = React.useMemo(
    () => encodeURIComponent(courseTitle),
    [courseTitle]
  );
  const encodedUrl = React.useMemo(
    () => encodeURIComponent(currentUrl),
    [currentUrl]
  );

  const canShare = Boolean(currentUrl);

  const handleCopy = React.useCallback(async () => {
    if (!canShare || typeof navigator === "undefined" || !navigator.clipboard) {
      setCopied(false);
      setCopyMessage("Link unavailable");
      return;
    }

    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setCopyMessage("Link copied");
      window.setTimeout(() => {
        setCopied(false);
        setCopyMessage("");
      }, 1800);
    } catch {
      setCopied(false);
      setCopyMessage("Copy failed");
    }
  }, [canShare, currentUrl]);

  const handleNativeShare = React.useCallback(async () => {
    if (!canNativeShare || !canShare || typeof navigator === "undefined") return;

    try {
      await navigator.share({
        title: courseTitle,
        text: courseTitle,
        url: currentUrl,
      });
    } catch {
      // user canceled or share failed
    }
  }, [canNativeShare, canShare, courseTitle, currentUrl]);

  const socialActions: SocialAction[] = React.useMemo(
    () => [
      {
        key: "whatsapp",
        label: "WhatsApp",
        icon: MessageCircle,
        href: canShare
          ? `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
          : undefined,
        disabled: !canShare,
      },
      {
        key: "twitter",
        label: "X",
        icon: Twitter,
        href: canShare
          ? `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
          : undefined,
        disabled: !canShare,
      },
      {
        key: "linkedin",
        label: "LinkedIn",
        icon: Linkedin,
        href: canShare
          ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
          : undefined,
        disabled: !canShare,
      },
      {
        key: "facebook",
        label: "Facebook",
        icon: Facebook,
        href: canShare
          ? `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
          : undefined,
        disabled: !canShare,
      },
      {
        key: "email",
        label: "Email",
        icon: Mail,
        href: canShare
          ? `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A${encodedUrl}`
          : undefined,
        disabled: !canShare,
      },
      {
        key: "instagram",
        label: "Instagram",
        icon: Instagram,
        onClick: handleCopy,
        disabled: !canShare,
        helperText: "Copies link for Instagram sharing",
      },
    ],
    [canShare, encodedTitle, encodedUrl, handleCopy]
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Share course"
          className="group inline-flex size-10 items-center justify-center rounded-full border border-primary-200/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.7),rgba(238,242,255,0.86))] text-primary shadow-[0_10px_20px_-14px_rgba(var(--primary-bare),0.5)] backdrop-blur-md transition-[transform,border-color,background,box-shadow,color] duration-300 ease-out hover:-translate-y-[1px] hover:border-secondary-200 hover:bg-[linear-gradient(160deg,rgba(255,255,255,0.82),rgba(255,236,236,0.82))] hover:text-secondary-700 hover:shadow-[0_14px_24px_-16px_rgba(188,20,29,0.45)] active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300 focus-visible:ring-offset-2"
        >
          <Share2 className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-[1.04]" />
        </button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="w-[min(94vw,540px)] overflow-hidden border-0 bg-transparent p-0 shadow-none"
      >
        <div className="relative overflow-hidden rounded-[30px] border border-white/45 bg-[linear-gradient(160deg,rgba(255,255,255,0.26),rgba(255,255,255,0.12))] shadow-[0_34px_90px_-34px_rgba(var(--primary-bare),0.58)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,rgba(255,255,255,0.5)_0%,rgba(255,255,255,0.09)_42%,rgba(77,107,255,0.15)_100%)]" />
          <div className="pointer-events-none absolute inset-[1px] rounded-[28px] border border-white/35" />
          <div className="pointer-events-none absolute -left-14 -top-14 h-44 w-44 rounded-full bg-primary-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-secondary-200/30 blur-3xl" />
          <div className="pointer-events-none absolute right-6 top-12 h-24 w-24 rounded-full bg-secondary-100/30 blur-2xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.56),rgba(255,255,255,0))]" />

          <div className="relative z-10 border-b border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(255,255,255,0.12))] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md">
            <DialogTitle className="text-lg font-semibold tracking-tight text-primary">
              Share Course
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-neutral-700">
              Send this course to learners, teammates, or your community.
            </DialogDescription>
          </div>

          <div className="relative z-10 space-y-4 px-6 py-5">
            <section className="rounded-2xl border border-primary-100/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.52),rgba(238,242,255,0.38))] p-4 shadow-[0_16px_30px_-24px_rgba(var(--primary-bare),0.5)] backdrop-blur-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">
                Course
              </p>
              <p className="mt-1 line-clamp-2 text-sm font-semibold text-neutral-900">
                {courseTitle}
              </p>
              <p className="mt-1 text-xs text-neutral-700">
                Invite others to view this course
              </p>
            </section>

            <section className="rounded-2xl border border-white/60 bg-[linear-gradient(170deg,rgba(255,255,255,0.68),rgba(255,255,255,0.45))] p-4 shadow-[0_18px_32px_-24px_rgba(var(--primary-bare),0.45)] backdrop-blur-xl">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">
                Share Link
              </p>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={currentUrl}
                  aria-label="Share URL"
                  placeholder="Generating share link..."
                  className="h-11 flex-1 rounded-xl border border-white/70 bg-white/72 px-3 text-xs text-neutral-800 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-neutral-500 focus-visible:border-primary-300 focus-visible:ring-2 focus-visible:ring-primary-200/70"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!canShare}
                  aria-label={copied ? "Link copied" : "Copy share link"}
                  className={`inline-flex h-11 min-w-[96px] items-center justify-center gap-1 rounded-xl border px-3 text-xs font-semibold shadow-[0_14px_24px_-18px_rgba(var(--primary-bare),0.45)] transition-[transform,border-color,background,box-shadow,color] duration-300 ease-out disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 ${
                    copied
                      ? "border-secondary-300/90 bg-[linear-gradient(165deg,rgba(255,255,255,0.78),rgba(255,204,205,0.78))] text-secondary-700 focus-visible:ring-secondary-300"
                      : "border-primary-200/90 bg-[linear-gradient(165deg,rgba(255,255,255,0.76),rgba(218,228,255,0.9))] text-primary focus-visible:ring-primary-300 hover:-translate-y-[1px] hover:border-secondary-200 hover:bg-[linear-gradient(165deg,rgba(255,255,255,0.84),rgba(255,236,236,0.86))] hover:text-secondary-700 hover:shadow-[0_16px_26px_-18px_rgba(188,20,29,0.45)] active:translate-y-0 active:scale-[0.99]"
                  }`}
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p
                className={`mt-2 text-xs ${
                  copyMessage === "Link copied"
                    ? "text-secondary-700"
                    : "text-neutral-700"
                }`}
              >
                {copyMessage ||
                  (canShare
                    ? "Use this link anywhere."
                    : "Link unavailable right now.")}
              </p>
            </section>

            <section className="rounded-2xl border border-white/55 bg-[linear-gradient(160deg,rgba(255,255,255,0.5),rgba(238,242,255,0.38),rgba(255,236,236,0.2))] p-4 shadow-[0_18px_34px_-24px_rgba(var(--primary-bare),0.52)] backdrop-blur-xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary/80">
                Share to
              </p>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {socialActions.map((action) => {
                  const Icon = action.icon;
                  const buttonClasses =
                    "group/cta inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/65 bg-[linear-gradient(170deg,rgba(255,255,255,0.66),rgba(238,242,255,0.58))] text-primary shadow-[0_12px_22px_-16px_rgba(var(--primary-bare),0.5)] backdrop-blur-md transition-[transform,border-color,background,box-shadow,color] duration-300 ease-out hover:-translate-y-[1px] hover:border-secondary-200 hover:bg-[linear-gradient(170deg,rgba(255,255,255,0.78),rgba(255,236,236,0.72))] hover:text-secondary-700 hover:shadow-[0_16px_24px_-18px_rgba(188,20,29,0.42)] active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300 disabled:cursor-not-allowed disabled:opacity-45";

                  return (
                    <div
                      key={action.key}
                      className="flex flex-col items-center gap-1.5"
                    >
                      {action.href ? (
                        <a
                          href={action.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Share course via ${action.label}`}
                          className={buttonClasses}
                          onClick={(event) => {
                            if (action.disabled) event.preventDefault();
                          }}
                        >
                          <Icon className="h-5 w-5 transition-transform duration-300 group-hover/cta:scale-[1.04]" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={action.onClick}
                          aria-label={
                            action.helperText ||
                            `Share course via ${action.label}`
                          }
                          disabled={action.disabled}
                          className={buttonClasses}
                        >
                          <Icon className="h-5 w-5 transition-transform duration-300 group-hover/cta:scale-[1.04]" />
                        </button>
                      )}
                      <span className="text-[11px] font-medium text-neutral-700">
                        {action.label}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-[11px] text-neutral-700">
                Instagram shortcut copies the link so you can paste it in your
                story, bio, or DM.
              </p>
            </section>
          </div>

          <div className="relative z-10 flex flex-col-reverse gap-2 border-t border-white/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.12))] px-6 py-4 backdrop-blur-md sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={handleNativeShare}
              disabled={!canNativeShare || !canShare}
              className="inline-flex h-10 items-center justify-center rounded-full border border-secondary-200/85 bg-[linear-gradient(160deg,rgba(255,255,255,0.78),rgba(255,236,236,0.78))] px-4 text-xs font-semibold text-secondary-700 shadow-[0_14px_24px_-18px_rgba(188,20,29,0.36)] transition-[transform,border-color,background,box-shadow,color] duration-300 ease-out hover:-translate-y-[1px] hover:border-secondary-300 hover:bg-[linear-gradient(160deg,rgba(255,255,255,0.86),rgba(255,204,205,0.76))] hover:shadow-[0_16px_26px_-18px_rgba(188,20,29,0.46)] active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300"
            >
              Share via Device
            </button>
            <DialogClose asChild>
              <button
                type="button"
                className="inline-flex h-10 items-center justify-center rounded-full border border-primary-300/70 bg-[linear-gradient(160deg,rgba(var(--primary-bare),0.95),rgba(47,79,255,0.85))] px-5 text-xs font-semibold text-white shadow-[0_16px_30px_-16px_rgba(var(--primary-bare),0.78)] transition-[transform,filter,box-shadow] duration-300 ease-out hover:-translate-y-[1px] hover:brightness-105 hover:shadow-[0_18px_32px_-16px_rgba(var(--primary-bare),0.82)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/55"
              >
                Done
              </button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
