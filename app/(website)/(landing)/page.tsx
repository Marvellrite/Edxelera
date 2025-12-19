import { Navbar } from '@/components/landing/navbar';
import { HeroSection } from '@/components/landing/hero-section';
import { ProcessSection } from '@/components/landing/process-section';
import { FeaturesSection } from '@/components/landing/features-section';
import { LearnersSection } from '@/components/landing/learners-section';
import { CoursesSection } from '@/components/landing/courses-section';
import { TestimonialsSection } from '@/components/landing/testimonials-section';
import { AppSection } from '@/components/landing/app-section';
import { CTASection } from '@/components/landing/cta-section';
import AnnouncementBar from '@/components/landing/announcement-bar';


export default function LandingPage() {
  return (
      <>
        <AnnouncementBar/>
        <HeroSection />
        <ProcessSection />
        <FeaturesSection />
        <LearnersSection />
        <CTASection />
        <CoursesSection />
        <TestimonialsSection />
        <AppSection />
    </>
  );
}