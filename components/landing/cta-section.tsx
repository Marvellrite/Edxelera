import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="bg-white py-16 lg:py-14">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[150px] text-center space-y-3">
        <h2 className="text-black text-[48px] leading-[150%] font-semibold">Teach on Edxelera</h2>
        <div className="space-y-6">
          <p className="text-neutral-800 text-md max-w-[646px] mx-auto">
            Share your expertise, inspire thousands of learners, and earn by creating high-quality courses that make a real impact
          </p>
          <Button  
            className=" hover:bg-neutral-50 text-white border-white h-14 rounded-full px-10 font-medium"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}