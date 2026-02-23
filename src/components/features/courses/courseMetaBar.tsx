import React from "react";
import { UserTag, VideoSquare, Graduation, Star } from "@/components/icons/modified";



type CourseMetaBarProps = {
  instructor?: string;
  length?: string;
  learners?: string;
  rating?: string;
  className?: string;
};

type StatItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function StatItem({ icon, label, value }: StatItemProps) {
  return (
    <div className="flex w-[100px] flex-col items-center justify-center gap-1">
      <div className="flex size-6 items-center justify-center text-[#939393]">
        {icon}
      </div>

      <p className="text-[12px] leading-[18px] text-[#939393]">{label}</p>

      <p className="text-[16px] font-medium leading-[24px] text-[#494949]">
        {value}
      </p>
    </div>
  );
}

function Divider() {
  // Figma: 32px line rotated -90deg => vertical divider 32px tall
  return <div className="h-8 w-px bg-[#B7B7B7]" aria-hidden="true" />;
}

export default function CourseMetaBar({
  instructor = "Kevin",
  length = "15 hours",
  learners = "13,389",
  rating = "4.9",
  className = "",
}: CourseMetaBarProps) {
  return (
    <section
      className={[
        "box-border flex h-[94px] w-full max-w-[822px] items-center justify-between gap-1",
        "rounded-[8px] bg-white px-5 py-3",
        className,
      ].join(" ")}
      aria-label="Course metadata"
    >
      <StatItem
        icon={<UserTag className="size-6" />}
        label="Instructor"
        value={instructor}
      />

      <Divider />

      <StatItem
        icon={<VideoSquare className="h-6 w-6" />}
        label="Length"
        value={length}
      />

      <Divider />

      <StatItem
        icon={<Graduation className="h-6 w-6" />}
        label="Learners"
        value={learners}
      />

      <Divider />

      <StatItem
        icon={<Star className="h-5 w-5" />}
        label="Rating"
        value={rating}
      />
    </section>
  );
}