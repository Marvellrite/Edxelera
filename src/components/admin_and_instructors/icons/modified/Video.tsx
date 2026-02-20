import * as React from "react";
import type { SVGProps } from "react";
const SvgVideo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <path
      stroke="#494949"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M14.618 23.823H7.245c-3.687 0-4.912-2.45-4.912-4.911V9.088c0-3.686 1.225-4.911 4.912-4.911h7.373c3.687 0 4.912 1.225 4.912 4.911v9.824c0 3.686-1.237 4.911-4.912 4.911M22.773 19.95l-3.243-2.275v-7.362l3.243-2.275c1.587-1.108 2.894-.431 2.894 1.517v8.89c0 1.948-1.307 2.625-2.894 1.505"
    />
    <path
      stroke="#494949"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M13.417 12.834a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5"
    />
  </svg>
);
export default SvgVideo;
