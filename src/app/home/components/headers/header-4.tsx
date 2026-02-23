import * as React from "react";
import { ArrowLeft, Bell, Moon, ShoppingCart, Sun } from "lucide-react";

type HeaderTopBarProps = {
  greeting?: string;
  name?: string;
  avatarUrl?: string;

  notificationCount?: number;
  cartCount?: number;

  theme?: "light" | "dark";
  onBack?: () => void;
  onNotifications?: () => void;
  onToggleTheme?: () => void;
  onCart?: () => void;

  className?: string;
};

function Badge({ count }: { count?: number }) {
  if (!count || count <= 0) return null;

  const text = count > 9 ? "9+" : String(count);

  return (
    <span className="absolute -right-0 -top-[2px] grid h-[14px] w-[14px] place-items-center rounded-full bg-[#ED1C24] text-[7px] font-bold leading-none text-white">
      {text}
    </span>
  );
}

export default function HeaderTopBar({
  greeting = "Good morning",
  name = "John Ojochegbe",
  avatarUrl = "https://via.placeholder.com/40",
  notificationCount = 1,
  cartCount = 1,
  theme = "light",
  onBack,
  onNotifications,
  onToggleTheme,
  onCart,
  className = "",
}: HeaderTopBarProps) {
  const isLight = theme === "light";

  return (
    <header
      className={[
        "flex w-full max-w-[1106px] items-center justify-between",
        "pt-10 pb-[10px]", // padding: 40px 0 10px
        className,
      ].join(" ")}
    >
      {/* Left: Back */}
      <button
        type="button"
        onClick={onBack}
        className="inline-flex h-[30px] w-[32px] items-center justify-center text-[#2C2C2C]"
        aria-label="Go back"
      >
        <ArrowLeft className="h-[22px] w-[22px]" strokeWidth={2.3} />
      </button>

      {/* Middle: Avatar + greeting */}
      <div className="flex items-center gap-2">
        <img
          src={avatarUrl}
          alt={name}
          className="h-10 w-10 rounded-full object-cover"
        />

        <div className="flex flex-col justify-center">
          <p className="-my-[2px] text-[14px] font-light leading-[21px] text-[#6E6E6E]">
            {greeting}
          </p>
          <p className="text-[16px] font-medium leading-[24px] text-[#040506]">
            {name}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications with right divider */}
        <div className="flex h-12 items-center pr-4">
          <button
            type="button"
            onClick={onNotifications}
            className="relative inline-flex h-11 w-11 items-center justify-center"
            aria-label="Notifications"
          >
            <Bell className="h-7 w-7 text-[#001146]" />
            <Badge count={notificationCount} />
          </button>

          <div className="ml-4 h-11 w-[1.5px] bg-[#EDEDED]" aria-hidden="true" />
        </div>

        {/* Theme toggle pill */}
        <button
          type="button"
          onClick={onToggleTheme}
          className={[
            "inline-flex h-12 w-24 items-center gap-1 rounded-full",
            "border border-[#EDEDED] bg-white px-[14px] py-2",
          ].join(" ")}
          aria-label="Toggle theme"
        >
          <span
            className={[
              "inline-flex h-8 w-8 items-center justify-center rounded-full",
              isLight ? "bg-[#001146] text-white" : "text-[#6E6E6E]",
            ].join(" ")}
          >
            <Sun className="h-[19.2px] w-[19.2px]" />
          </span>

          <span
            className={[
              "inline-flex h-8 w-8 items-center justify-center rounded-full",
              !isLight ? "bg-[#001146] text-white" : "text-[#6E6E6E]",
            ].join(" ")}
          >
            <Moon className="h-[19.2px] w-[19.2px]" />
          </span>
        </button>

        {/* Cart with badge */}
        <button
          type="button"
          onClick={onCart}
          className="relative inline-flex h-7 w-7 items-center justify-center"
          aria-label="Cart"
        >
          <ShoppingCart className="h-7 w-7 text-[#001146]" />
          {/* Figma has badge offset more outward on cart */}
          {cartCount > 0 ? (
            <span className="absolute -right-[6px] -top-[6px] grid h-[14px] w-[14px] place-items-center rounded-full bg-[#ED1C24] text-[7px] font-bold leading-none text-white">
              {cartCount > 9 ? "9+" : String(cartCount)}
            </span>
          ) : null}
        </button>
      </div>
    </header>
  );
}