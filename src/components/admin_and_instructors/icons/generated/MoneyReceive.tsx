import * as React from "react";
import type { SVGProps } from "react";
const SvgMoneyReceive = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      stroke="#040506"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.333 9.167c0 .646.5 1.166 1.113 1.166H8.7c.533 0 .966-.453.966-1.02 0-.606-.266-.826-.66-.966L7 7.647c-.394-.14-.66-.354-.66-.967 0-.56.433-1.02.966-1.02H8.56c.613 0 1.113.52 1.113 1.167M8 5v6"
    />
    <path
      stroke="#040506"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.666 8A6.67 6.67 0 0 1 8 14.667 6.67 6.67 0 0 1 1.333 8 6.67 6.67 0 0 1 8 1.333"
    />
    <path
      stroke="#040506"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.333 2v2.667H14M14.666 1.333l-3.333 3.334"
    />
  </svg>
);
export default SvgMoneyReceive;
