import '../styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { ToastContainer } from "react-toastify";
import Provider from './providers';
import { Google_Sans_Flex } from "next/font/google";



const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"],
});

export const metadata: Metadata = {
   title: 'EdXeLera',
   manifest: '/manifest.json',
   description: '',
   icons: {
      icon: 'https://res.cloudinary.com/dx5iohojj/image/upload/v1773340428/repo-images/public/assets/logo.png',
   },
};

export const viewport: Viewport = {
   maximumScale: 1,
   userScalable: false,
   viewportFit: 'auto',
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {


   return (
      <html lang="en">
         <head>
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340428/repo-images/public/assets/logo.png" />
            <link
               rel="apple-touch-icon"
               sizes="512x512"
               href="https://res.cloudinary.com/dx5iohojj/image/upload/v1773340428/repo-images/public/assets/logo.png"
            />
            <meta name="theme-color" content="#0f172a" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta
               name="apple-mobile-web-app-status-bar-style"
               content="default"
            />
         </head>

         <body
            className={`${googleSansFlex.className} antialiased `}
         >
            <Provider>
               {children}
               <ToastContainer autoClose={1800} icon={false} toastClassName='p-0' position='bottom-right'/>

            </Provider>
         </body>
      </html>
   );
}
