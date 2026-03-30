import SeeAllButton from "@/components/ui/see-all-btn";
import AchievementBadgeCard, {
  type AchievementBadgeCardProps,
} from "./achievement-badge-card";

type AchievedBadgesProps = {
  title?: string;
  actionLabel?: React.ReactNode;
  badges: AchievementBadgeCardProps[];
};

const AchievedBadges = ({
  title = "Badges",
  actionLabel = "See all",
  badges,
}: AchievedBadgesProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-md font-normal text-primary">{title}</span>
        <SeeAllButton>{actionLabel}</SeeAllButton>
      </div>

      <div className="flex gap-3 overflow-x-auto">
        {badges.map((badge, index) => (
          <AchievementBadgeCard
            key={`${badge.title ?? "badge"}-${index}`}
            {...badge}
          />
        ))}
      </div>
    </div>
  );
};

export default AchievedBadges;
