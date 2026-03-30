'use client'

import { usePathname } from 'next/navigation';
import React from 'react';
import { Header1, Header2, Header3, Header6 } from '@/components/shared/headers';

// Header mapping object - maps pathname segment to header component
const headerMap: Record<string, React.ComponentType> = {
   home: Header1,
   explore: Header2,
   'my-courses': Header3,
   community: Header1,
   'my-profile': Header6,
   'edit-profile': Header6,
   settings: Header6,
};

const Header: React.FC = () => {
   const pathname = usePathname();

   // Extract the last segment from pathname
   // e.g., '/home/explore' -> 'explore', '/home' -> 'home'
   const pathSegment = pathname.split('/').filter(Boolean).pop() || 'home';

   // Get the appropriate header component, default to Header1
   const SelectedHeader = headerMap[pathSegment] || Header1;

   return <SelectedHeader />;
};

export default Header;
