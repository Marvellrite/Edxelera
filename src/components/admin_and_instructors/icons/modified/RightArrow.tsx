import * as React from "react";
import type { SVGProps } from "react";
const SvgRightArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#001146"
      d="M10 0C4.49 0 0 4.49 0 10s4.49 10 10 10 10-4.49 10-10S15.51 0 10 0m2.79 10.53-3.53 3.53c-.15.15-.34.22-.53.22s-.38-.07-.53-.22a.754.754 0 0 1 0-1.06l3-3-3-3a.754.754 0 0 1 0-1.06c.29-.29.77-.29 1.06 0l3.53 3.53c.3.29.3.77 0 1.06"
    />
  </svg>
);
export default SvgRightArrow;
