"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EdxeleraLogo } from "@/components/instructor/onboarding/edxelera-logo";
import {
  DEFAULT_INSTRUCTOR_ONBOARDING_RESULT_IMAGE,
  DEFAULT_INSTRUCTOR_ONBOARDING_RESULT_LOGO,
  INSTRUCTOR_ONBOARDING_RESULT_CONTENT,
} from "@/components/instructor/onboarding/onboarding-questions-result-content";
import type { InstructorOnboardingResultProps } from "@/components/instructor/onboarding/types";
import { cn } from "@/lib/utils";

export default function InstructorOnboardingResult({
  variant,
  className,
  ctaHref,
  onGetStarted,
  imageSrc = DEFAULT_INSTRUCTOR_ONBOARDING_RESULT_IMAGE,
  logoSrc = DEFAULT_INSTRUCTOR_ONBOARDING_RESULT_LOGO,
  priority = true,
}: InstructorOnboardingResultProps) {
  const content = INSTRUCTOR_ONBOARDING_RESULT_CONTENT[variant];

  return (
    <section
      className={cn("relative isolate w-full overflow-hidden", className)}
      style={{ background: "var(--color-surface-home)" }}
    >
      <div className="relative mx-auto min-h-screen w-full max-w-[1440px] overflow-hidden px-4 py-8 sm:px-6 md:px-8 lg:px-0 lg:py-0">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            <Image
              src={imageSrc}
              alt="Instructor onboarding"
              fill
              priority={priority}
              sizes="100vw"
              className="object-cover object-[68%_50%] lg:object-[62%_50%]"
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(88.41deg, rgba(255, 255, 255, 0.8) 21.19%, rgba(255, 255, 255, 0.546335) 51.02%, rgba(255, 255, 255, 0) 75.56%)",
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-white/8" />

        <div className="relative z-10 flex min-h-[620px] items-center">
          <div
            className={cn(
              "w-full rounded-[20px] border px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10",
              "backdrop-blur-[1.5px]",
            )}
            style={{
              maxWidth: content.cardMaxWidth,
              minHeight: content.cardMinHeight,
              marginLeft: "clamp(0px, 6.46vw, 93px)",
              background: "var(--color-surface)",
              borderColor: "var(--color-surface)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            <div className="flex h-full flex-col items-start justify-center gap-6">
              <EdxeleraLogo src={logoSrc} priority={priority} />

              <div className="flex w-full flex-col items-start gap-6">
                <div className="flex w-full flex-col items-start gap-2">
                  <h1
                    className={cn(
                      "font-medium tracking-[-0.04em]",
                      "text-[clamp(2rem,3.2vw,2.5rem)] leading-[1.2] lg:leading-[1.5]",
                    )}
                    style={{
                      color: "var(--color-text-default)",
                      maxWidth: content.titleMaxWidth ?? "100%",
                      fontFamily: "var(--font-google-sans)",
                    }}
                  >
                    {content.title}
                  </h1>

                  {content.description && (
                    <div
                      className="max-w-[471px] text-[var(--text-md)] leading-[1.5]"
                      style={{
                        color: "var(--color-neutral-900)",
                        fontFamily: "var(--font-google-sans)",
                      }}
                    >
                      <p>{content.description}</p>

                      {content.checklist && content.checklist.length > 0 && (
                        <ul className="mt-2 list-disc space-y-1 pl-7">
                          {content.checklist.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                <Button asChild className="w-74">
                  <Link href={ctaHref} onClick={onGetStarted}>
                    Let&apos;s Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
