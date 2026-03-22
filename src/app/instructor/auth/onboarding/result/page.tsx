import OnboardingQuestionsResult from "@/components/instructor/onboarding/onboarding-questions-result"

export default function DemoPage() {
  return (
    <main className="space-y-12">
      <OnboardingQuestionsResult variant="not-experienced-no-course" ctaHref="/instructor/auth/onboarding" />
{/* 
      <OnboardingQuestionsResult variant="experienced-no-course" ctaHref="/instructor/auth/onboarding" />

      <OnboardingQuestionsResult variant="experienced-with-course" ctaHref="/instructor/dashboard" /> */}
    </main>
  )
}