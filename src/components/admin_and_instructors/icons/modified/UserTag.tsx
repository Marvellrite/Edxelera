import * as React from "react";
import type { SVGProps } from "react";
const SvgUserTag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={20}
    fill="none"
    {...props}
  >
    <path
      fill="#494949"
      d="M15 0H3C1.34 0 0 1.33 0 2.97v10.91c0 1.64 1.34 2.97 3 2.97h.76c.8 0 1.56.31 2.12.87l1.71 1.69c.78.77 2.05.77 2.83 0l1.71-1.69c.56-.56 1.33-.87 2.12-.87H15c1.66 0 3-1.33 3-2.97V2.97C18 1.33 16.66 0 15 0M9 3.75c1.29 0 2.33 1.04 2.33 2.33S10.29 8.41 9 8.41 6.67 7.36 6.67 6.08c0-1.29 1.04-2.33 2.33-2.33m2.68 9.31H6.32c-.81 0-1.28-.9-.83-1.57.68-1.01 2-1.69 3.51-1.69s2.83.68 3.51 1.69c.45.67-.03 1.57-.83 1.57"
    />
  </svg>
);
export default SvgUserTag;
