import * as React from "react";
import type { SVGProps } from "react";
const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
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
      strokeMiterlimit={10}
      strokeWidth={1.25}
      d="M11.05 3 4.21 10.242c-.259.275-.509.816-.559 1.191l-.308 2.7c-.108.975.592 1.642 1.558 1.475l2.684-.458c.375-.067.9-.342 1.158-.625l6.842-7.242c1.183-1.25 1.716-2.675-.125-4.416C13.625 1.142 12.234 1.75 11.05 3"
    />
    <path
      stroke="#2C2C2C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.25}
      d="M9.908 4.209A5.105 5.105 0 0 0 14.45 8.5M2.5 18.334h15"
    />
  </svg>
);
export default SvgEdit;
