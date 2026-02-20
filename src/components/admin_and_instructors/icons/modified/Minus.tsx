import * as React from "react";
import type { SVGProps } from "react";
const SvgMinus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      stroke="#2C2C2C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M9.933 18.333c4.583 0 8.333-3.75 8.333-8.333s-3.75-8.333-8.333-8.333S1.6 5.417 1.6 10s3.75 8.333 8.333 8.333M6.6 10h6.666"
    />
  </svg>
);
export default SvgMinus;
