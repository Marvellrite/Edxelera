export default function deriveCourseMode({
  isEnrolled,
  cohortStartAt,
  cohortEndAt,
}: {
  isEnrolled: boolean;
  cohortStartAt: Date;
  cohortEndAt: Date;
}) {
  const now = new Date();

  if (!isEnrolled) return "marketing";
  if (now < cohortStartAt) return "waiting";
  if (now <= cohortEndAt) return "live";
  return "completed";
}