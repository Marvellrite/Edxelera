import type { SVGProps } from "react";

type LucideProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  strokeWidth?: number | string;
};

function IconBase({ size = 20, strokeWidth = 2, children, ...props }: LucideProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children ?? <circle cx="12" cy="12" r="9" />}
    </svg>
  );
}

function createIcon() {
  return function LucideIcon(props: LucideProps) {
    return <IconBase {...props} />;
  };
}

export const AlertCircle = createIcon();
export const ArrowRight = createIcon();
export const Award = createIcon();
export const BarChart2 = createIcon();
export const Bell = createIcon();
export const BookOpen = createIcon();
export const Briefcase = createIcon();
export const CalendarClock = createIcon();
export const CheckCircle2 = createIcon();
export const ChevronDown = createIcon();
export const ChevronLeft = createIcon();
export const ChevronRight = createIcon();
export const ClipboardList = createIcon();
export const Clock = createIcon();
export const CreditCard = createIcon();
export const DollarSign = createIcon();
export const Download = createIcon();
export const ExternalLink = createIcon();
export const Eye = createIcon();
export const EyeOff = createIcon();
export const FileText = createIcon();
export const Filter = createIcon();
export const GraduationCap = createIcon();
export const LayoutDashboard = createIcon();
export const LayoutList = createIcon();
export const Lock = createIcon();
export const LogOut = createIcon();
export const MessageSquare = createIcon();
export const PlayCircle = createIcon();
export const Search = createIcon();
export const Settings = createIcon();
export const TrendingUp = createIcon();
export const Trophy = createIcon();
export const UserPlus = createIcon();
export const Users = createIcon();
export const Video = createIcon();
export const XCircle = createIcon();
