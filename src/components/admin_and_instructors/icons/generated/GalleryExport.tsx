import * as React from "react";
import type { SVGProps } from "react";
const SvgGalleryExport = (props: SVGProps<SVGSVGElement>) => (
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
      d="M10.5 11.667A2.333 2.333 0 1 0 10.5 7a2.333 2.333 0 0 0 0 4.667"
    />
    <path
      stroke="#494949"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M15.166 2.334H10.5c-5.834 0-8.167 2.333-8.167 8.166v7c0 5.834 2.333 8.167 8.167 8.167h7c5.833 0 8.166-2.334 8.166-8.167v-5.833"
    />
    <path
      stroke="#494949"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M21 9.334v-7l2.333 2.333M21 2.334l-2.333 2.333M3.115 22.108l5.752-3.861c.922-.619 2.252-.549 3.08.163l.385.338c.91.782 2.38.782 3.29 0l4.853-4.165c.91-.781 2.38-.781 3.29 0l1.902 1.634"
    />
  </svg>
);
export default SvgGalleryExport;
