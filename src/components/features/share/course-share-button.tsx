"use client";

import * as React from "react";
import {
  Share2,
  MessageCircle,
  Mail,
  Linkedin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import CourseShareDialogContent, {
  type SocialAction,
} from "@/components/features/share/course-share-dialog-content";

type CourseShareButtonProps = {
  courseTitle?: string;
  shareUrl?: string;
};

export default function CourseShareButton({
  courseTitle = "Check out this course on Edxelera",
  shareUrl,
}: CourseShareButtonProps) {
  const [mounted, setMounted] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [copyMessage, setCopyMessage] = React.useState("");
  const [currentUrl, setCurrentUrl] = React.useState("");
  const [canNativeShare, setCanNativeShare] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  const triggerButton = (
    <button
      type="button"
      aria-label="Share course"
      className="group inline-flex size-10 items-center justify-center rounded-full border border-primary-200/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.7),rgba(238,242,255,0.86))] text-primary shadow-[0_10px_20px_-14px_rgba(var(--primary-bare),0.5)] backdrop-blur-md transition-[transform,border-color,background,box-shadow,color] duration-300 ease-out hover:-translate-y-[1px] hover:border-secondary-200 hover:bg-[linear-gradient(160deg,rgba(255,255,255,0.82),rgba(255,236,236,0.82))] hover:text-secondary-700 hover:shadow-[0_14px_24px_-16px_rgba(188,20,29,0.45)] active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-300 focus-visible:ring-offset-2"
    >
      <Share2 className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-[1.05]" />
    </button>
  );

  if (!mounted) return triggerButton;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="w-[min(94vw,540px)] overflow-hidden border-0 bg-transparent p-0 shadow-none"
      >
        <CourseShareDialogContent
          courseTitle={courseTitle}
          currentUrl={currentUrl}
          copied={copied}
          copyMessage={copyMessage}
          canShare={canShare}
          canNativeShare={canNativeShare}
          socialActions={socialActions}
          handleCopy={handleCopy}
          handleNativeShare={handleNativeShare}
        />
      </DialogContent>
    </Dialog>
  );
}
