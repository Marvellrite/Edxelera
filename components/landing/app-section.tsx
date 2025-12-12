import Image from 'next/image';

export function AppSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-[150px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-6">
            <h2 className="text-neutral-900 text-5xl font-semibold leading-[72px]">
              Learn Anywhere with the Edxelera App
            </h2>
            <div className="space-y-6">
              <p className="text-neutral-800 text-lg">
                Stay connected to your classes, track your progress, and continue learning on the go — anytime, anywhere
              </p>
              <Image
                src="/images/landing/app-badges.svg"
                alt="Download on App Store and Google Play"
                width={330}
                height={48}
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Right - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <Image
              src="/images/landing/iphone-mockup.png"
              alt="Edxelera mobile app"
              width={567}
              height={457}
              className="w-full max-w-[567px] h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}