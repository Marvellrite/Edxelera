import * as React from 'react';
import type { SVGProps } from 'react';
const SvgMessages = (props: SVGProps<SVGSVGElement>) => (
   <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      {...props}
   >
      <g xmlns="http://www.w3.org/2000/svg" fill="currentColor">
         <path d="M13.59 10.4v4.07c0 .36-.04.7-.13 1.01-.37 1.47-1.59 2.39-3.27 2.39H7.47l-3.02 2.01a.671.671 0 0 1-1.05-.56v-1.45c-1.02 0-1.87-.34-2.46-.93-.6-.6-.94-1.45-.94-2.47V10.4c0-1.9 1.18-3.21 3-3.38.13-.01.26-.02.4-.02h6.79c2.04 0 3.4 1.36 3.4 3.4" />
         <path d="M15.75 13.6c1.27 0 2.34-.42 3.08-1.17.75-.74 1.17-1.81 1.17-3.08v-5.1C20 1.9 18.1 0 15.75 0h-8.5C4.9 0 3 1.9 3 4.25V5c0 .28.22.5.5.5h6.69c2.71 0 4.9 2.19 4.9 4.9v2.7c0 .28.22.5.5.5z" />
      </g>
   </svg>
);
export default SvgMessages;
