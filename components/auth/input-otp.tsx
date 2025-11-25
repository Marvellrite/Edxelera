'use client';

import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';

import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from '@/components/ui/input-otp';

export default function OTPInputs({
   OTP,
   setOTP,
}: {
   OTP: string | undefined;
   setOTP: (OTP: string | undefined) => void;
}) {
   return (
      <InputOTP
         maxLength={9}
         pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
         value={OTP}
         onChange={setOTP}
         containerClassName=" w-full"
         style={{ width: '100%' }}
      >
         <InputOTPGroup className=" w-full gap-3 justify-center">
            {[0, 1, 2, 3, 4, 5].map((_, index) => (
               <InputOTPSlot
                  key={index}
                  className=" border border-neutral-600 rounded-[8px]! grow aspect-square h-[50px] data-[active=true]:ring-[2px] data-[active=true]:ring-neutral-300"
                  index={index}
               />
            ))}
         </InputOTPGroup>
      </InputOTP>
   );
}
