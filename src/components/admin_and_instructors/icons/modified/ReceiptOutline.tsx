import * as React from "react";
import type { SVGProps } from "react";
const SvgReceiptOutline = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18.333 5v2.017c0 1.316-.833 2.15-2.15 2.15h-2.85V3.342c0-.925.758-1.675 1.683-1.675a3.35 3.35 0 0 1 2.342.975c.6.608.975 1.441.975 2.358"
    />
    <path
      stroke="#2C2C2C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.25}
      d="M1.667 5.833V17.5A.83.83 0 0 0 3 18.167L4.425 17.1a.84.84 0 0 1 1.1.083l1.384 1.392a.84.84 0 0 0 1.183 0l1.4-1.4a.826.826 0 0 1 1.083-.075L12 18.167a.835.835 0 0 0 1.334-.667V3.333c0-.916.75-1.666 1.666-1.666H5C2.5 1.667 1.667 3.158 1.667 5z"
    />
    <path
      stroke="#2C2C2C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M5.208 8.333h4.583"
    />
  </svg>
);
export default SvgReceiptOutline;
