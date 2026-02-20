import * as React from "react";
import type { SVGProps } from "react";
const SvgBookOutline = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18.334 13.95V3.892c0-1-.817-1.742-1.809-1.659h-.05c-1.75.15-4.408 1.042-5.891 1.975l-.142.092a.92.92 0 0 1-.883 0l-.209-.125c-1.483-.925-4.133-1.808-5.883-1.95a1.64 1.64 0 0 0-1.8 1.658V13.95c0 .8.65 1.55 1.45 1.65l.242.033c1.808.242 4.6 1.159 6.2 2.034l.033.016c.225.125.583.125.8 0 1.6-.883 4.4-1.808 6.217-2.05l.275-.033c.8-.1 1.45-.85 1.45-1.65M10 4.575v12.5M6.458 7.075H4.583M7.083 9.575h-2.5"
    />
  </svg>
);
export default SvgBookOutline;
