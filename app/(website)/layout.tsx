import { Navbar } from '@/components/website/landing/navbar';
import { Footer } from '@/components/website/landing/footer';
import { ReactNode } from 'react';


interface Props {
    children: ReactNode
} 

export default function WebsiteLayout({children}:Props) {
  return (
      <>
      
        <main className="relative overflow-y-visible theLanding flex flex-col ">
            
            <Navbar />
            {children}
        </main>
        <Footer />
      </>
      

  );
}