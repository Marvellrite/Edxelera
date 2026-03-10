import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions
} from "@tanstack/react-query";
import {
  courseAPI,
  Course,
  CourseAPIResponse,
  CourseListData,
  CourseListQueryParams,
  CreateLessonData,
  CreateLessonPayload,
  CreateModuleData,
  CreateModulePayload,
  CreateCoursePayload,
  EditCoursePayload,
  PresignedUrlData,
  PresignedUrlPayload,
} from "./api";

export const courseQueryKeys = {
  all: ["courses"] as const,
  lists: () => [...courseQueryKeys.all, "list"] as const,
  list: (params?: CourseListQueryParams) =>
    [...courseQueryKeys.lists(), params ?? {}] as const,
  details: () => [...courseQueryKeys.all, "detail"] as const,
  detail: (courseId: string) => [...courseQueryKeys.details(), courseId] as const,
};

export const useGetCourses = (
  params?: CourseListQueryParams,
  options?: UseQueryOptions<CourseAPIResponse<CourseListData>, Error>
) => {
  return useQuery({
    queryKey: courseQueryKeys.list(params),
    queryFn: () => courseAPI.getCourses(params),
    ...options,
  });
};

export const useGetCourse = (
  courseId: string,
  options?: UseQueryOptions<CourseAPIResponse<Course>, Error>
) => {
  return useQuery({
    queryKey: courseQueryKeys.detail(courseId),
    queryFn: () => courseAPI.getCourse(courseId),
    enabled: !!courseId,
    ...options,
  });
};

export const useCreateCourse = (
  options?: UseMutationOptions<CourseAPIResponse<Course>, Error, CreateCoursePayload>
) => {
  return useMutation({
    mutationFn: courseAPI.createCourse,
    ...options,
  });
};

export const useEditCourse = (
  options?: UseMutationOptions<CourseAPIResponse<Course>, Error, EditCoursePayload>
) => {
  return useMutation({
    mutationFn: courseAPI.editCourse,
    ...options,
  });
};

export const useDeleteCourse = (
  options?: UseMutationOptions<CourseAPIResponse<null>, Error, string>
) => {
  return useMutation({
    mutationFn: courseAPI.deleteCourse,
    ...options,
  });
};

export const useGetPresignedUrl = (
  options?: UseMutationOptions<
    CourseAPIResponse<PresignedUrlData>,
    Error,
    PresignedUrlPayload | undefined
  >
) => {
  return useMutation({
    mutationFn: courseAPI.getPresignedUrl,
    ...options,
  });
};

export const useCreateModule = (
  options?: UseMutationOptions<
    CourseAPIResponse<CreateModuleData>,
    Error,
    CreateModulePayload
  >
) => {
  return useMutation({
    mutationFn: courseAPI.createModule,
    ...options,
  });
};

export const useGetLessonPresignedUrl = (
  options?: UseMutationOptions<
    CourseAPIResponse<PresignedUrlData>,
    Error,
    PresignedUrlPayload
  >
) => {
  return useMutation({
    mutationFn: courseAPI.getLessonPresignedUrl,
    ...options,
  });
};

export const useCreateLesson = (
  options?: UseMutationOptions<
    CourseAPIResponse<CreateLessonData>,
    Error,
    CreateLessonPayload
  >
) => {
  return useMutation({
    mutationFn: courseAPI.createLesson,
    ...options,
  });
};
