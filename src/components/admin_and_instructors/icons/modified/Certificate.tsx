import * as React from "react";
import type { SVGProps } from "react";
const SvgCertificate = (props: SVGProps<SVGSVGElement>) => (
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
      strokeMiterlimit={10}
      d="M1.333 4v1.613c0 1.053.667 1.72 1.72 1.72h2.28v-4.66c0-.74-.607-1.34-1.347-1.34a2.68 2.68 0 0 0-1.873.78A2.68 2.68 0 0 0 1.333 4"
    />
    <path
      stroke="#040506"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M14.667 4.666V14a.665.665 0 0 1-1.067.533l-1.14-.853a.67.67 0 0 0-.88.066l-1.106 1.114a.67.67 0 0 1-.947 0l-1.12-1.12a.66.66 0 0 0-.867-.06l-1.14.853A.668.668 0 0 1 5.334 14V2.666c0-.733-.6-1.333-1.334-1.333h8c2 0 2.667 1.193 2.667 2.667z"
    />
    <path
      stroke="#040506"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.833 6.667H8.166"
    />
  </svg>
);
export default SvgCertificate;
