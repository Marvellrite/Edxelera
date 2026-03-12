import React from "react";

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

const AddFolderIcon: React.FC<IconProps> = ({
  size = 28,
  color = "#494949",
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M14.0701 19.2501V13.4167"
        stroke={color}
        strokeWidth="1.75"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M16.9166 16.3333H11.0833"
        stroke={color}
        strokeWidth="1.75"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        d="M25.6666 12.8333V19.8333C25.6666 24.4999 24.4999 25.6666 19.8333 25.6666H8.16659C3.49992 25.6666 2.33325 24.4999 2.33325 19.8333V8.16659C2.33325 3.49992 3.49992 2.33325 8.16659 2.33325H9.91659C11.6666 2.33325 12.0516 2.84659 12.7166 3.73325L14.4666 6.06659C14.9099 6.64992 15.1666 6.99992 16.3333 6.99992H19.8333C24.4999 6.99992 25.6666 8.16659 25.6666 12.8333Z"
        stroke={color}
        strokeWidth="1.75"
        strokeMiterlimit="10"
      />
    </svg>
  );
};

export default AddFolderIcon;