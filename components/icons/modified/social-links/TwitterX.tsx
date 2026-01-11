import * as React from 'react';
import type { SVGProps } from 'react';
const SvgTwitterX = (props: SVGProps<SVGSVGElement>) => (
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
         d="M15.837 6h2.031l-4.436 5.083L18.651 18h-4.086l-3.2-4.196L7.703 18H5.67l4.745-5.437L5.41 6H9.6l2.892 3.834zm-.711 10.782h1.125L8.987 7.154H7.781z"
      />
   </svg>
);
export default SvgTwitterX;
