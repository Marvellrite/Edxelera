# Course API Integration

This folder contains the course API connection layer and React Query hooks.

## Endpoints wired

- `GET /api/v1/courses`
- `GET /api/v1/courses/:id`
- `POST /api/v1/courses/create`
- `PATCH /api/v1/courses/:id/edit`
- `DELETE /api/v1/courses/:id/delete`
- `POST /api/v1/courses/get-presigned-url`

## Usage

```tsx
import { useGetCourses, useCreateCourse } from "@/api/course";

const { data, isLoading } = useGetCourses({ page: 1, limit: 10 });

const { mutate: createCourse } = useCreateCourse();
createCourse({
  title: "Frontend Web Development",
  duration: 6,
  price: 150000,
  overview: "Frontend course",
  poster: "https://example.com/poster.png",
});
```
