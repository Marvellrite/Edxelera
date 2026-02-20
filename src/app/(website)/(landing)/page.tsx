import { HeroSection } from '@/components/website/landing/hero-section';
import { ProcessSection } from '@/components/website/landing/process-section';
import { FeaturesSection } from '@/components/website/landing/features-section';
import { LearnersSection } from '@/components/website/landing/learners-section';
import { CoursesSection } from '@/components/website/landing/courses-section';
import { TestimonialsSection } from '@/components/website/landing/testimonials-section';
import { AppSection } from '@/components/website/landing/app-section';
import { CTASection } from '@/components/website/landing/cta-section';
import AnnouncementBar from '@/components/website/landing/announcement-bar';
import { hero_slides } from '@/lib/landing-data';


export default function LandingPage() {
  return (
      <>
        <AnnouncementBar/>
        <HeroSection slides={hero_slides} />
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