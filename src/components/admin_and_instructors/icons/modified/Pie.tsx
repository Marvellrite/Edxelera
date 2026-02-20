import * as React from "react";
import type { SVGProps } from "react";
const SvgPie = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <mask id="pie_svg__a" fill="#fff">
      <path d="M15 7.945c.552 0 1.006.449.938.997A8 8 0 1 1 7.003.007C7.55-.062 8 .392 8 .945v6a1 1 0 0 0 1 1z" />
    </mask>
    <path
      stroke="#040506"
      strokeWidth={2.4}
      d="M15 7.945c.552 0 1.006.449.938.997A8 8 0 1 1 7.003.007C7.55-.062 8 .392 8 .945v6a1 1 0 0 0 1 1z"
      mask="url(#pie_svg__a)"
    />
  </svg>
);
export default SvgPie;
