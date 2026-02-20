"use client"
import { useState, useEffect, ReactNode } from 'react';

const ScreenSize = ({ children }: { children: ReactNode }) => {
    const [isMobile, setIsMobile] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 430);
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);

    if (isMobile) {
        return (
            <main className='flex bg-primary min-h-screen w-screen justify-center items-center'>
                <p className='text-2xl text-center text-white w-4/5'>We&apos;re Sorry, This page is currently not available to small screens, Please try using a large sreen, laptop(recommended)</p>
            </main>
        );
    }

    return (
        <>
            { children }
        </>
    );
};

export default ScreenSize;