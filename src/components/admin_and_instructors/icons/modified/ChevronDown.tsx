import * as React from "react";
import type { SVGProps } from "react";
const SvgChevronDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 9"
    {...props}
  >
    <path
      stroke="#494949"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M15 1 9.24 7.43c-.68.76-1.8.76-2.48 0L1 1"
    />
  </svg>
);
export default SvgChevronDown;
