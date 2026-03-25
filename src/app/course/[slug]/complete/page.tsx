import CourseReview from "@/components/features/course/quiz/course-review";
import ReviewReceived from "@/components/features/course/quiz/review-received";

const CourseReviewPage = ()=>{

    const noReview = false

    return noReview? <CourseReview /> : <ReviewReceived/>
}


export default CourseReviewPage;