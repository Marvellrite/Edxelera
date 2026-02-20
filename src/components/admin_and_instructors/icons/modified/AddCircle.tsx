import * as React from "react";
import type { SVGProps } from "react";
const SvgAddCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path
      stroke="#494949"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M14 25.667c6.416 0 11.666-5.25 11.666-11.667S20.416 2.334 14 2.334 2.333 7.584 2.333 14 7.583 25.667 14 25.667M9.333 14h9.333M14 18.667V9.334"
    />
  </svg>
);
export default SvgAddCircle;
