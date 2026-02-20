import * as React from "react";
import type { SVGProps } from "react";
const SvgAwardOutline = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3.55 9.183v4.142c0 1.517 0 1.517 1.433 2.483l3.942 2.275c.591.342 1.558.342 2.15 0l3.942-2.275c1.433-.966 1.433-.966 1.433-2.483V9.183c0-1.516 0-1.516-1.433-2.483l-3.942-2.275c-.592-.342-1.559-.342-2.15 0L4.983 6.7c-1.433.967-1.433.967-1.433 2.483"
    />
    <path
      stroke="#2C2C2C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      d="M14.584 6.358V4.167q0-2.5-2.5-2.5H7.917q-2.5 0-2.5 2.5V6.3M10.526 9.158 11 9.9a.73.73 0 0 0 .366.267l.85.216c.525.134.667.584.325 1l-.558.675a.75.75 0 0 0-.142.434l.05.875c.034.541-.35.816-.85.616l-.816-.325a.72.72 0 0 0-.459 0l-.817.325c-.5.2-.883-.083-.85-.616l.05-.875a.73.73 0 0 0-.141-.434l-.559-.675c-.341-.416-.2-.866.325-1l.85-.216a.7.7 0 0 0 .367-.267l.475-.742c.3-.45.767-.45 1.058 0"
    />
  </svg>
);
export default SvgAwardOutline;
