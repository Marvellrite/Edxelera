import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { ReactNode } from 'react';


interface Props {
    children: ReactNode
} 

export default function WebsiteLayout({children}:Props) {
  return (
      <>
      
        <main className="relative min-h-screen overflow-y-visible theLanding flex flex-col ">
            
            <Navbar />
            {children}
        </main>
        <Footer />
      </>
      

  );
}