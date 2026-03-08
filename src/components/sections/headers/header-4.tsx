'use client'

import * as React from "react";
import { Bell, ArrowLeft} from "@/components/icons/modified"
import Image from "next/image";
import toTitleCase from "@/utils/toTitleCase";
import { useTheme } from "@/hooks/useTheme";
import { useStudentSession } from "@/hooks/useStudentSession";
import ThemeTogglerComponent from "@/components/common/theme-toggler";
import Badge from "@/components/common/badge";
import useFixedAnchoredElement from "@/hooks/useFixedAnchoredElement";
import CartDrawerButton from "@/components/features/cart/cart-drawer-button";
import CourseShareButton from "@/components/features/share/course-share-button";
import CartBellButton from "@/components/features/cart/cart-bell-button";

type HeaderTopBarProps = {

  notificationCount?: number;
  cartCount?: number;

  onBack?: () => void;
  onNotifications?: () => void;
  onToggleTheme?: () => void;
  onCart?: () => void;

  className?: string;

  headerTitle?: string;
  showbackBtn?: boolean
};


export default function HeaderTopBar({
  notificationCount = 1,
  cartCount = 1,
  onBack,
  onNotifications,
  onToggleTheme,
  onCart,
  className = "",
  headerTitle='',
  showbackBtn=true
}: HeaderTopBarProps) {
  // const isLight = theme === "light";
  const { anchorRef, fixedRef, fixedStyle, spacerHeight } = useFixedAnchoredElement<HTMLElement>();


      const { user } = useStudentSession();
      const { toggleTheme } = useTheme();
      console.log(user)
  
      const displayName = user?.fullname || 'Student';
  
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div ref={anchorRef}>
      <div aria-hidden style={{ height: spacerHeight }} />
      <header
        ref={fixedRef}
        style={fixedStyle}
        className={[
          "flex w-full max-w-full items-center justify-between gap-2 overflow-x-hidden",
          "  py-5 bg-surface-home",
          className,
        ].join(" ")}
      >
        <div className='flex gap-6 items-center'>
          {/* Left: Back */}
          {
            showbackBtn &&
          <button
            type="button"
            onClick={onBack}
            className=" h-7.5 w-8 items-center justify-center text-[#2C2C2C]"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5.5 w-5.5" strokeWidth={2.3} />
          </button>
          }
          {
            headerTitle &&
          <h1 className=" font-medium text-[40px]">{headerTitle}</h1>
          }

        </div>


      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 md:gap-3">
      {/* Right: Actions */}

      
       <div className='ms-2 hidden lg:flex min-w-0 items-center gap-2 md:ms-3 md:gap-3'>  
        {/* Avatar + Greeting */}
          <Image
              src="/icons/photo.png"
              alt="user image"
              className="h-10 w-10 shrink-0 rounded-full"
              width={25}
              height={25}
          />

          <div className="min-w-0">
              <p className="hidden md:flex text-neutral-600">
                  {toTitleCase(greeting)}
              </p>
              <p className="max-w-[110px] truncate font-medium text-neutral-900 md:max-w-[180px]">
                  {toTitleCase(displayName)}
              </p>
          </div>
      </div>

        {/* Notifications with right divider */}
        <div className="flex h-12 shrink-0 items-center ms-2 hidden lg:flex">
          <CartBellButton/>

        </div>

        {/* Theme toggle pill */}
          <ThemeTogglerComponent />


        <CourseShareButton courseTitle={headerTitle || "Course on Edxelera"} />

        <CartDrawerButton count={cartCount} onOpen={onCart} />
      </div>
      </header>
    </div>
  );
}
