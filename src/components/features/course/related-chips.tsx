import React from "react";

type RelatedChipsProps = {
  title?: string;
  items: string[];
  selected?: string | string[];
  onSelect?: (value: string) => void;
  className?: string;
};

const isSelected = (selected: RelatedChipsProps["selected"], item: string) => {
  if (!selected) return false;
  return Array.isArray(selected) ? selected.includes(item) : selected === item;
};

export default function RelatedChips({
  title = "Related",
  items = ["Graphic Design", "Product Design", "Branding", "Data Analytics", "Corporate Design"],
  selected = "Branding",
  onSelect,
  className = "",
}: RelatedChipsProps) {
  return (
    <section className={`w-full flex flex-col items-start gap-3 ${className}`}>
      <p className="text-[16px] leading-6 font-normal text-[#001146]">{title}</p>

      {/* chips row */}
      <div
        className="
          w-full
          flex items-start gap-1
          flex-wrap
          overflow-x-auto
          pb-1
          [-ms-overflow-style:none] [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {items.map((item) => {
          const active = isSelected(selected, item);

          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect?.(item)}
              className={[
                // layout
                "shrink-0",
                "inline-flex items-center justify-center",
                "h-11 px-3 py-2.5",
                "rounded-lg border",
                "transition-colors",
                // figma colors
                active
                  ? "bg-[#001146] border-[#001146] text-white"
                  : "bg-white border-[#F3F3F3] text-[#6E6E6E]",
                // nice hover
                active ? "hover:bg-[#001146]/90" : "hover:bg-[#F7F7F7]",
                // focus
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#001146] focus-visible:ring-offset-2",
              ].join(" ")}
            >
              <span className="text-[16px] leading-6 font-normal whitespace-nowrap">
                {item}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* Example usage:
<RelatedChips
  items={["Graphic Design", "Product Design", "Branding", "Data Analytics", "Corporate Design"]}
  selected="Branding"
  onSelect={(v) => console.log(v)}
/>
*/