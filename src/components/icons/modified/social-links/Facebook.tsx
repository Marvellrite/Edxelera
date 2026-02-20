import * as React from 'react';
import type { SVGProps } from 'react';
const SvgFacebook = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      {...props}
   >
      <rect width={24} height={24} fill="#fff" rx={12} />
      <path
         fill="currentColor"
         d="M12.33 4.8C8.19 4.8 4.8 8.18 4.8 12.345a7.546 7.546 0 0 0 6.356 7.455v-5.271H9.243v-2.184h1.913v-1.664c0-1.89 1.122-2.93 2.846-2.93.82 0 1.68.144 1.68.144v1.86h-.95c-.933 0-1.227.58-1.227 1.174v1.416h2.093l-.338 2.184h-1.755v5.27a7.53 7.53 0 0 0 6.355-7.454c0-4.164-3.388-7.545-7.53-7.545"
      />
   </svg>
);
export default SvgFacebook;
