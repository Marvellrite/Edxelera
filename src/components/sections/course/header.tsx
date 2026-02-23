'use client'

import * as React from "react";
import { Cart, Bell, ArrowLeft} from "@/components/icons/modified"
import Image from "next/image";
import toTitleCase from "@/utils/toTitleCase";
import { useTheme } from "@/hooks/useTheme";
import { useStudentSession } from "@/hooks/useStudentSession";
import ThemeTogglerComponent from "@/components/common/theme-toggler";
import Badge from "@/components/common/badge";

type HeaderTopBarProps = {

  notificationCount?: number;
  cartCount?: number;

  onBack?: () => void;
  onNotifications?: () => void;
  onToggleTheme?: () => void;
  onCart?: () => void;

  className?: string;
};


export default function HeaderTopBar({
  notificationCount = 1,
  cartCount = 1,
  onBack,
  onNotifications,
  onToggleTheme,
  onCart,
  className = "",
}: HeaderTopBarProps) {
  // const isLight = theme === "light";


      const { user } = useStudentSession();
      const { toggleTheme } = useTheme();
      console.log(user)
  
      const displayName = user?.fullname || 'Student';
  
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <header
      className={[
        "flex w-full max-w-full items-center justify-between gap-2 overflow-x-hidden",
        , // padding: 40px 0 10px
        className,
      ].join(" ")}
    >
      {/* Left: Back */}
      <button
        type="button"
        onClick={onBack}
        className=" h-[30px] w-[32px] items-center justify-center text-[#2C2C2C]"
        aria-label="Go back"
      >
        <ArrowLeft className="h-[22px] w-[22px]" strokeWidth={2.3} />
      </button>


      <div className="flex min-w-0 flex-1 items-center justify-end gap-2 md:gap-3">
      {/* Right: Actions */}

      
       <div className='ms-2 flex min-w-0 items-center gap-2 md:ms-3 md:gap-3'>  
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
        <div className="flex h-12 shrink-0 items-center pr-2 md:pr-4">
          <button
            type="button"
            onClick={onNotifications}
            className="relative inline-flex h-11 w-11 items-center justify-center"
            aria-label="Notifications"
          >
            <Bell className="size-5 text-primary" />
            <Badge  count={notificationCount} className="top-1 right-1.25" />
          </button>

        </div>

        {/* Theme toggle pill */}
        <div className="shrink-0">
          <ThemeTogglerComponent />
        </div>

        {/* Cart with badge */}
        <button
          type="button"
          onClick={onCart}
          className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center"
          aria-label="Cart"
        >
          <Cart className="h-7 w-7 text-[#001146]" />
           <Badge count={notificationCount} />
        </button>
      </div>
    </header>
  );
}
