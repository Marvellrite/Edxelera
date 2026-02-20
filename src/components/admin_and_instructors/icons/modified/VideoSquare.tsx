import * as React from "react";
import type { SVGProps } from "react";
const SvgVideoSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="currentColor"
      d="M14.19 0H5.81C2.17 0 0 2.17 0 5.81v8.37C0 17.83 2.17 20 5.81 20h8.37c3.64 0 5.81-2.17 5.81-5.81V5.81C20 2.17 17.83 0 14.19 0m-1.53 11.73-1.28.74-1.28.74c-1.65.95-3 .17-3-1.73V8.52c0-1.91 1.35-2.68 3-1.73l1.28.74 1.28.74c1.65.95 1.65 2.51 0 3.46"
    />
  </svg>
);
export default SvgVideoSquare;
