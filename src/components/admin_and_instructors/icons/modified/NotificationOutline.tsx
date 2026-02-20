import * as React from "react";
import type { SVGProps } from "react";
const SvgNotificationOutline = (props: SVGProps<SVGSVGElement>) => (
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
      strokeMiterlimit={10}
      strokeWidth={1.25}
      d="M10 5.367v2.775M10.017 1.667a5.55 5.55 0 0 0-5.55 5.55v1.75c0 .566-.233 1.416-.525 1.9l-1.058 1.766c-.65 1.092-.2 2.309 1 2.709a19.45 19.45 0 0 0 12.275 0 1.85 1.85 0 0 0 1-2.709L16.1 10.867c-.291-.484-.525-1.342-.525-1.9v-1.75c-.008-3.05-2.508-5.55-5.558-5.55Z"
    />
    <path
      stroke="#2C2C2C"
      strokeMiterlimit={10}
      strokeWidth={1.25}
      d="M12.775 15.683A2.785 2.785 0 0 1 10 18.458a2.78 2.78 0 0 1-1.959-.816c-.5-.5-.816-1.2-.816-1.959"
    />
  </svg>
);
export default SvgNotificationOutline;
