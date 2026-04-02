import { cn } from "@/lib/utils";

interface Props {
    className?: string,
    count: number
}

export default function Badge({ count, className }: Props) {
  if (!count || count <= 0) return null;

  const text = count > 9 ? "9+" : String(count);

  return (
    <span className= {cn("absolute right-0 -top-0.5 grid h-3.5 w-3.5 place-items-center rounded-full bg-[#ED1C24] text-[7px] font-bold leading-none !text-white", className)}>
      {text}
    </span>
  );
}
