import * as React from 'react';
import type { SVGProps } from 'react';
const SvgInstagram = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
   >
      <rect width={24} height={24} fill="#fff" rx={12} />
      <path
         fill="#001146"
         d="M16.53 4.5h-9c-1.65 0-3 1.35-3 3v9c0 1.65 1.35 3 3 3h9c1.65 0 3-1.35 3-3v-9c0-1.65-1.35-3-3-3m-4.5 11.25A3.76 3.76 0 0 1 8.28 12a3.76 3.76 0 0 1 3.75-3.75A3.76 3.76 0 0 1 15.78 12a3.76 3.76 0 0 1-3.75 3.75m4.125-7.125a.75.75 0 0 1-.75-.75c0-.412.338-.75.75-.75.413 0 .75.338.75.75s-.337.75-.75.75"
      />
   </svg>
);
export default SvgInstagram;
