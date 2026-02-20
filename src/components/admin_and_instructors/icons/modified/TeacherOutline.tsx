import * as React from "react";
import type { SVGProps } from "react";
const SvgTeacherOutline = (props: SVGProps<SVGSVGElement>) => (
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
      d="m6.7 1.686-4.013 2.62a2.124 2.124 0 0 0 0 3.56l4.013 2.62c.72.473 1.907.473 2.627 0l3.993-2.62a2.124 2.124 0 0 0 0-3.553l-3.993-2.62c-.72-.48-1.907-.48-2.627-.007"
    />
    <path
      stroke="#040506"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m3.754 8.72-.007 3.126c0 .847.653 1.754 1.453 2.02l2.127.707c.367.12.973.12 1.347 0l2.126-.707c.8-.266 1.454-1.173 1.454-2.02V8.753M14.267 10V6"
    />
  </svg>
);
export default SvgTeacherOutline;
