import * as React from "react";
import type { SVGProps } from "react";
const SvgLeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M10 0c5.51 0 10 4.49 10 10s-4.49 10-10 10S0 15.51 0 10 4.49 0 10 0M7.21 10.53l3.53 3.53c.15.15.34.22.53.22s.38-.07.53-.22c.29-.29.29-.77 0-1.06l-3-3 3-3c.29-.29.29-.77 0-1.06a.754.754 0 0 0-1.06 0L7.21 9.47c-.3.29-.3.77 0 1.06"
    />
  </svg>
);
export default SvgLeftArrow;
