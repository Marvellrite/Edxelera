import * as React from "react";
import type { SVGProps } from "react";
const SvgUserOutline = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10 10a4.167 4.167 0 1 0 0-8.333A4.167 4.167 0 0 0 10 10M17.159 18.333c0-3.225-3.209-5.833-7.159-5.833s-7.158 2.608-7.158 5.833"
    />
  </svg>
);
export default SvgUserOutline;
