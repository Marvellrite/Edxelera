"use client";

import React, {
  ClipboardEvent,
  KeyboardEvent,
  useRef,
  useState,
} from "react";
import { isOtpvalid } from "@/lib/utils/is-otp-valid";
import { cn } from "@/lib/utils";

interface Props {
  length: number;
  onChange?: (otp: string[]) => void;
  onComplete?: (otp: string[]) => void;
  inputMode: "numeric" | "alphanumeric";
}

export const OtpInputGroup = ({
  length,
  onChange,
  onComplete,
  inputMode = "alphanumeric",
}: Props) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  /* ---------------- utils ---------------- */

  const getNextIndex = () => {
    const emptyIndex = otp.findIndex(v => !v);
    return emptyIndex !== -1 ? emptyIndex : length - 1;
  };

  /* ---------------- handlers ---------------- */

  const handleChange = (value: string, index: number) => {
    const char = value.slice(-1);
    if (!isOtpvalid(char, inputMode)) return;

    const nextOtp = [...otp];
    nextOtp[index] = char;
    setOtp(nextOtp);
    onChange?.(nextOtp);

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    } else {
      onComplete?.(nextOtp);
    }
  };

 const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
  if (e.key === "Backspace") {
    e.preventDefault();
    
    const nextOtp = [...otp];
    
    if (nextOtp[index]) {
      // Clear current field if it has a value
      nextOtp[index] = "";
      setOtp(nextOtp);
      onChange?.(nextOtp);
    } else if (index > 0) {
      // Move to previous field and clear it if current is empty
      nextOtp[index - 1] = "";
      setOtp(nextOtp);
      onChange?.(nextOtp);
      inputsRef.current[index - 1]?.focus();
    }
  }
};

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .split("")
      .filter(char => isOtpvalid(char, inputMode))
      .slice(0, length);

    if (!pasted.length) return;

    const nextOtp = Array(length).fill("");
    pasted.forEach((char, i) => (nextOtp[i] = char));

    setOtp(nextOtp);
    onChange?.(nextOtp);

    const lastIndex = pasted.length - 1;
    inputsRef.current[lastIndex]?.focus();

    if (pasted.length === length) {
      onComplete?.(nextOtp);
    }
  };

  const handleGroupClick = () => {
    inputsRef.current[getNextIndex()]?.focus();
  };

  const handleMouseEnter = () => {
    setHoverIndex(getNextIndex());
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  /* ---------------- render ---------------- */

  return (
    <div
      className="flex gap-2 w-full justify-between"
      onClick={handleGroupClick}
      onMouseDown={e => e.preventDefault()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {otp.map((value, index) => (
        <input
          key={index}
          ref={el => {
            inputsRef.current[index] = el;
          }}
          type="text"
          value={value}
          maxLength={1}
          autoComplete="one-time-code"
          onChange={e => handleChange(e.target.value, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(index)}
          onBlur={() => setFocusedIndex(null)}
          className={cn(
            "text-center rounded-full bg-white py-4 w-12 aspect-59/53 transition-colors",
            hoverIndex === index && focusedIndex !== index && "bg-neutral-50",
            focusedIndex === index && "ring-2 ring-primary"
          )}
          style={{ flexBasis: `${100 / length - 3}%` }}
        />
      ))}
    </div>
  );
};
