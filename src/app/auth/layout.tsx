import Image from 'next/image';
// import '../globals.css';

export default function AuthLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <section className="relative grid h-screen w-full grid-cols-1 grid-rows-1 overflow-hidden lg:grid-cols-10">
         <div className="relative hidden h-full lg:col-span-5 lg:block">
            <Image
               
               src="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340438/repo-images/public/assets/student/auth/student-typing-computer-2.jpg"
               alt="side image"
               className=" object-cover"
               fill
            />
            <div className="absolute w-full h-full bg-linear-to-b from-text/75 to-text/40"></div>
         </div>
         <div className="col-span-5 h-screen w-full overflow-y-auto bg-surface bg-cover bg-no-repeat md:bg-[url('https://res.cloudinary.com/dx5iohojj/image/upload/v1773340411/repo-images/public/assets/auth.png')] lg:h-full lg:bg-none">
            {children}
         </div>
      </section>
   );
}
