import React from "react";

interface WhatYouWillLearnProps {
  items?: string[];
  className?: string;
}

const defaultItems: string[] = [
  "How to design websites",
  "How to craft engaging user experiences",
  "How to create aesthetically pleasing user interfaces",
  "How to use wireframes and prototypes",
  "Difference between UI and UX and why they are both important",
  "The skill behind product design",
];

const WhatYouWillLearn: React.FC<WhatYouWillLearnProps> = ({
  items = defaultItems,
  className = "",
}) => {
  return (
    <section
      className={`flex flex-col items-start gap-3 w-full ${className}`}
    >
      {/* Heading */}
      <h3
        className="text-base leading-[150%] font-normal text-primary"
        // style={{ color: "#001146", fontFamily: "Google Sans Flex" }}
      >
        What You&apos;ll Learn
      </h3>

      {/* List */}
      <ul
        className="flex flex-col gap-3 w-full text-[18px] leading-[150%] font-normal list-disc pl-5"
        style={{ color: "#2C2C2C", fontFamily: "Google Sans Flex" }}
      >
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default WhatYouWillLearn;