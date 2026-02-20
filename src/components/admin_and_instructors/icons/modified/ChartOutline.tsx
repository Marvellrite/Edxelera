import * as React from "react";
import type { SVGProps } from "react";
const SvgChartOutline = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2.5 18.333h15M4.667 6.983H3.333a.836.836 0 0 0-.833.834V15c0 .458.375.833.833.833h1.334A.836.836 0 0 0 5.5 15V7.817a.836.836 0 0 0-.833-.834M10.667 4.325H9.333a.836.836 0 0 0-.833.833V15c0 .458.375.833.833.833h1.334A.836.836 0 0 0 11.5 15V5.158a.836.836 0 0 0-.833-.833M16.667 1.667h-1.334a.836.836 0 0 0-.833.833V15c0 .458.375.833.833.833h1.334A.836.836 0 0 0 17.5 15V2.5a.836.836 0 0 0-.833-.833"
    />
  </svg>
);
export default SvgChartOutline;
