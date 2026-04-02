export type AchievementBadgeCardProps = {
   id?: string;
   earnedAt?: string;
   title?: string;
   description?: string;
   unlockedOn?: string;
   imageSrc?: string;
   className?: string;
};

export interface CertificateCardProps {
   id?: string;
   receivedAt?: string;
   posterSrc?: string;
   title: string;
   reception_date: string;
}
