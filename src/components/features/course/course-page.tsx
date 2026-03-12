"use client";

import React from "react";

import CourseHeroSection from "@/components/features/course/course-hero-section";
import CourseDetailsSections from "@/components/features/course/course-details-section";
import CourseAddedToCartDialog from "@/components/features/cart/course-added-to-cart-dialog";
import { Button } from "@/components/ui/button";
import { CourseMode } from "@/types/course";
import { useCartStore, type CartCourseItem } from "@/stores/cart-store";

type CoursePageProps = {
  mode?: CourseMode;
  course?: CartCourseItem;
};

const DEFAULT_COURSE: CartCourseItem = {
  _id: "product-design-ui-ux",
  posterSrc: "/assets/poster3.jpg",
  title: "Product Design (UI/UX)",
  price: 150000,
  duration: "15 hours",
  rating: 4.9,
};

const CoursePage = ({ mode = "marketing", course: courseOverride }: CoursePageProps) => {
  const addCourse = useCartStore((state) => state.addCourse);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [alreadyInCart, setAlreadyInCart] = React.useState(false);

  const course = React.useMemo(() => courseOverride ?? DEFAULT_COURSE, [courseOverride]);

  const handleAddToCart = () => {
    const result = addCourse(course);
    setAlreadyInCart(!result.added);
    setDialogOpen(true);
  };

  return (
    <section>
      <div className="mx-auto pb-10 max-md:pt-0">
        <CourseHeroSection mode={mode} />
        <CourseDetailsSections />

        <div className="mt-10 flex justify-center">
          <Button
            onClick={handleAddToCart}
            className="mx-auto h-14.25 rounded-[50px] px-2.5 py-3 md:w-full lg:w-99"
          >
            Add to Cart (&#8358;150,000)
          </Button>
        </div>

        <CourseAddedToCartDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          course={course}
          alreadyInCart={alreadyInCart}
        />
      </div>
    </section>
  );
};

export default CoursePage;
