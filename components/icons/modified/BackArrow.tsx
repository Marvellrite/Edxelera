import * as React from 'react';
import type { SVGProps } from 'react';
const SvgBackArrow = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={30}
      fill="none"
      {...props}
   >
      <path
         fill="#2C2C2C"
         d="M25.143 16a1.143 1.143 0 0 0 0-2.286V16M6.049 14.049a1.143 1.143 0 0 0 0 1.616l7.273 7.273a1.143 1.143 0 0 0 1.616-1.616l-6.465-6.465 6.465-6.465a1.143 1.143 0 0 0-1.616-1.616zm19.094.808v-1.143H6.857V16h18.286z"
      />
   </svg>
);
export default SvgBackArrow;
