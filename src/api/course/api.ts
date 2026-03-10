const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
const WEB_CLIENT_HEADER = { "x-client-type": "web" } as const;

export interface Course {
  course_id: string;
  title: string;
  duration: number;
  price: number;
  overview: string;
  poster: string | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
}

export interface CourseListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}

export interface CreateCoursePayload {
  title: string;
  duration: number;
  price: number;
  overview: string;
  poster: string;
}

export interface EditCoursePayload {
  courseId: string;
  data: Partial<CreateCoursePayload>;
}

export interface PresignedUrlPayload {
  file_type: string;
  title: string;
}

export type ExternalResource = {
  title: string;
  url: string;
  description?: string;
  type?: "video" | "article" | "repo" | "tool" | "dataset" | "documentation";
};

export interface PresignedUrlData {
  upload_url?: string;
  key?: string;
  fields?: Record<string, string>;
}

export interface CreateModulePayload {
  course_id: string;
  title: string;
}

export interface CreateModuleData {
  module_id: string;
}

export interface CreateLessonPayload {
  title: string;
  module_id: string;
  video_key?: string;
  video_size?: number;
  resources?: ExternalResource[];
}

export interface CreateLessonData {
  lesson_id: string;
}

export interface CourseAPIResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface CourseListData {
  items?: Course[];
  rows?: Course[];
  courses?: Course[];
  total?: number;
  page?: number;
  limit?: number;
}

const safeReadError = async (response: Response) => {
  try {
    const error = await response.json();
    return error?.message;
  } catch {
    return undefined;
  }
};

const getBearerToken = () => {
  if (typeof window === "undefined") {
    return undefined;
  }

  const localStorageToken =
    window.localStorage.getItem("access_token") ||
    window.localStorage.getItem("accessToken") ||
    window.localStorage.getItem("token");

  if (localStorageToken) {
    return localStorageToken;
  }

  const cookieToken = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("access_token="))
    ?.split("=")[1];

  return cookieToken;
};

const buildQueryString = (params?: CourseListQueryParams) => {
  if (!params) {
    return "";
  }

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

const request = async <T>(path: string, options?: RequestInit, useProxy: boolean = false): Promise<T> => {
  const token = getBearerToken();
  const response = await fetch(`${useProxy?`/api/proxy/${path}`:`${path}`}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...WEB_CLIENT_HEADER,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const message = await safeReadError(response);
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
};

export const courseAPI = {
  getCourses: (params?: CourseListQueryParams) =>
    request<CourseAPIResponse<CourseListData>>(
      `/courses${buildQueryString(params)}`,
      { method: "GET" }
    ),

  getCourse: (courseId: string) =>
    request<CourseAPIResponse<Course>>(`/courses/${courseId}`, {
      method: "GET",
    }),

  createCourse: (data: CreateCoursePayload) =>
    request<CourseAPIResponse<Course>>("/courses/create", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: 'include'
    }, true),

  editCourse: ({ courseId, data }: EditCoursePayload) =>
    request<CourseAPIResponse<Course>>(`/courses/${courseId}/edit`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteCourse: (courseId: string) =>
    request<CourseAPIResponse<null>>(`/courses/${courseId}/delete`, {
      method: "DELETE",
    }),

  getPresignedUrl: (data?: PresignedUrlPayload) =>
    request<CourseAPIResponse<PresignedUrlData>>(
      "/courses/get-presigned-url",
      {
        method: "POST",
        body: JSON.stringify(data ?? {}),
      }
    ),

  createModule: (data: CreateModulePayload) =>
    request<CourseAPIResponse<CreateModuleData>>("/modules/create", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    }, true),

  getLessonPresignedUrl: (data: PresignedUrlPayload) =>
    request<CourseAPIResponse<PresignedUrlData>>("/lessons/get-presigned-url", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    }, true),

  createLesson: (data: CreateLessonPayload) =>
    request<CourseAPIResponse<CreateLessonData>>("/lessons/create", {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    }, true),
};
