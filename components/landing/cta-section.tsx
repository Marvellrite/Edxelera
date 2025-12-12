import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="bg-primary py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[150px] text-center space-y-10">
        <h2 className="text-white text-5xl font-semibold">Teach on Edxelera</h2>
        <div className="space-y-6">
          <p className="text-white text-lg max-w-[646px] mx-auto">
            Share your expertise, inspire thousands of learners, and earn by creating high-quality courses that make a real impact
          </p>
          <Button 
            variant="outline" 
            className="bg-white hover:bg-neutral-50 text-neutral-900 border-white h-12 rounded-full px-8"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}