import * as React from "react";
import type { SVGProps } from "react";
const SvgUsersOutline = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7.633 9.058a1.5 1.5 0 0 0-.275 0A3.683 3.683 0 0 1 3.8 5.367c0-2.042 1.65-3.7 3.7-3.7a3.696 3.696 0 0 1 .133 7.392M13.675 3.333A2.915 2.915 0 0 1 16.59 6.25a2.92 2.92 0 0 1-2.808 2.917 1 1 0 0 0-.217 0M3.467 12.133c-2.017 1.35-2.017 3.55 0 4.892 2.291 1.533 6.05 1.533 8.341 0 2.017-1.35 2.017-3.55 0-4.892-2.283-1.525-6.041-1.525-8.341 0M15.283 16.667a4 4 0 0 0 1.633-.725c1.3-.975 1.3-2.584 0-3.559-.458-.35-1.016-.583-1.608-.716"
    />
  </svg>
);
export default SvgUsersOutline;
