import { Button } from "@/components/ui/button";
import { NotFound } from "@/components/icons/modified";

interface Props {
  msg?: string;
  ctaText?: string;
}

const CourseNotFound = ({ msg, ctaText }: Props) => {
  const message = msg ?? "Course not found";
  const buttonText = ctaText ?? "Explore Courses";

  return (
    <div className="h-full px-6 items-center flex flex-col gap-10 pt-12">
      <div>
        <NotFound />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-md self-center">No results to show</span>
        <span className="text-neutral-700 text-center whitespace-pre-line">{message}</span>
      </div>
      <Button>{buttonText}</Button>
    </div>
  );
};

export default CourseNotFound;
