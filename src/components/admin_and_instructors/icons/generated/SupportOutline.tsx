import * as React from "react";
import type { SVGProps } from "react";
const SvgSupportOutline = (props: SVGProps<SVGSVGElement>) => (
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
      d="M14.167 15.358h-3.333l-3.709 2.467a.83.83 0 0 1-1.291-.692v-1.775c-2.5 0-4.167-1.666-4.167-4.166v-5c0-2.5 1.667-4.167 4.167-4.167h8.333c2.5 0 4.167 1.667 4.167 4.167v5c0 2.5-1.667 4.166-4.167 4.166"
    />
    <path
      stroke="#2C2C2C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M10 9.467v-.175c0-.567.35-.867.7-1.109.341-.233.683-.533.683-1.083A1.38 1.38 0 0 0 10 5.717 1.38 1.38 0 0 0 8.616 7.1M9.996 11.458h.007"
    />
  </svg>
);
export default SvgSupportOutline;
