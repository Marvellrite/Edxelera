import * as React from "react";
import type { SVGProps } from "react";
const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={12}
    height={11}
    fill="none"
    {...props}
  >
    <path
      stroke="#2C2C2C"
      strokeLinecap="round"
      strokeWidth={1.154}
      d="m.577.577 9.79 9.79M10.577.577l-9.79 9.79"
    />
  </svg>
);
export default SvgClose;
