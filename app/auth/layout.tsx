import Image from 'next/image';
// import '../globals.css';

export default function AuthLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <section className="grid grid-cols-1 md:grid-cols-9 grid-rows-1 h-screen w-full relative">
         <div className="relative hidden md:flex col-span-4">
            <Image
               src="/assets/auth.png"
               alt="side image"
               className="w-full h-full"
               width={100}
               height={100}
            />
            <div className="absolute w-full h-full bg-linear-to-b from-text/75 to-text/40"></div>
         </div>
         <div className="col-span-5 w-full overflow-y-scroll">{children}</div>
      </section>
   );
}
