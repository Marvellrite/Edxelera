"use client"

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

type InstructorOnboardingResultVariant =
  | "not-experienced-no-course"
  | "experienced-no-course"
  | "experienced-with-course"

type InstructorOnboardingResultProps = {
  variant: InstructorOnboardingResultVariant
  className?: string
  ctaHref?: string
  onGetStarted?: () => void
  imageSrc?: string
  logoSrc?: string
  priority?: boolean
}

type VariantConfig = {
  title: string
  description?: string
  checklist?: string[]
  cardMaxWidth: string
  cardMinHeight: string
  titleMaxWidth?: string
}

const DEFAULT_IMAGE =
  "https://res.cloudinary.com/dx5iohojj/image/upload/v1773340422/repo-images/public/assets/instructor/auth/instructor.jpg"

const VARIANT_CONTENT: Record<InstructorOnboardingResultVariant, VariantConfig> = {
  "not-experienced-no-course": {
    title: "No experience? no worries",
    description:
      "We’ll guide you step-by-step to design and deliver your first course successfully.",
    cardMaxWidth: "570px",
    cardMinHeight: "347px",
    titleMaxWidth: "490px",
  },
  "experienced-no-course": {
    title: "Let’s Structure Your Knowledge",
    description: "We’ll help you turn your experience into a powerful course",
    cardMaxWidth: "551px",
    cardMinHeight: "380px",
    titleMaxWidth: "360px",
  },
  "experienced-with-course": {
    title: "Great, you’re good to go",
    description: "Here’s what you have to do:",
    checklist: [
      "Upload course content",
      "Structure modules",
      "Add assessments and capstone project",
      "Submit for review",
    ],
    cardMaxWidth: "551px",
    cardMinHeight: "444px",
    titleMaxWidth: "450px",
  },
}

function EdxeleraLogo({ src }: { src?: string }) {
  if (src) {
    return (
      <div className="relative h-10 w-[214.63px] shrink-0">
        <Image
          src={src}
          alt="Edxelera"
          fill
          sizes="215px"
          className="object-contain object-left"
          priority
        />
      </div>
    )
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
  )
}

function CtaButton({
  href,
  onClick,
  children,
}: {
  href?: string
  onClick?: () => void
  children: React.ReactNode
}) {
  const className = cn(
    "inline-flex h-[57px] min-w-[296px] items-center justify-center rounded-full px-8 text-center text-[var(--text-md)] font-medium transition-all duration-200",
    "hover:brightness-[0.97] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
  )

  const style: React.CSSProperties = {
    background: "var(--color-primary)",
    color: "var(--color-primary-foreground)",
    boxShadow: "0 10px 24px rgba(var(--primary-bare), 0.14)",
  }

  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={style}
        aria-label={typeof children === "string" ? children : "Get started"}
      >
        {children}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={style}
      aria-label={typeof children === "string" ? children : "Get started"}
    >
      {children}
    </button>
  )
}

export default function InstructorOnboardingResult({
  variant,
  className,
  ctaHref,
  onGetStarted,
  imageSrc = DEFAULT_IMAGE,
  logoSrc,
  priority = true,
}: InstructorOnboardingResultProps) {
  const content = VARIANT_CONTENT[variant]

  return (
    <section
      className={cn("relative isolate w-full overflow-hidden", className)}
      style={{ background: "var(--color-surface-home)" }}
    >
      <div className="relative mx-auto min-h-[620px] w-full max-w-[1440px] overflow-hidden px-4 py-8 sm:px-6 md:px-8  lg:px-0 lg:py-0">
        {/* Background image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 lg:inset-auto lg:left-1/2 lg:top-1/2 lg:h-[1141.3px] lg:w-[1712.38px] lg:-translate-x-[49.1%] lg:-translate-y-[43.4%]">
            <Image
              src={imageSrc}
              alt="Instructor onboarding"
              fill
              priority={priority}
              sizes="100vw"
              className="object-cover object-[68%_50%] lg:object-[62%_50%]"
            />
          </div>
        </div>

        {/* White mask gradient, flipped horizontally to match the frame */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(88.41deg, #FFFFFF 18.19%, rgba(255, 255, 255, 0.546335) 51.02%, rgba(255, 255, 255, 0.21) 90.56%)",
            transform: "scaleX(-1)",
          }}
        />

        {/* Extra soft veil so text stays readable on all crops */}
        <div className="pointer-events-none absolute inset-0 bg-white/8" />

        {/* Content rail */}
        <div className="relative z-10 flex min-h-[620px] items-center lg:min-h-[863px]">
          <div
            className={cn(
              "w-full rounded-[20px] border px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-10",
              "backdrop-blur-[1.5px]"
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
              <EdxeleraLogo src={logoSrc} />

              <div className="flex w-full flex-col items-start gap-6">
                <div className="flex w-full flex-col items-start gap-2">
                  <h1
                    className={cn(
                      "font-medium tracking-[-0.04em]",
                      "text-[clamp(2rem,3.2vw,2.5rem)] leading-[1.2] lg:leading-[1.5]"
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

                <CtaButton href={ctaHref} onClick={onGetStarted}>
                  Let’s Get Started
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}