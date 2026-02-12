const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export type UserRole = "admin" | "user";
export type UserStatus = "active" | "inactive" | "suspended";

export interface User {
    id: string;
    fullname: string;
    email: string;
    profile_img: string | null;
    location: string | null;
    dob: string | null; // ISO date string from server
    bio: string | null;
    role: UserRole;
    status: UserStatus;
    is_verified: boolean;
    token: string | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    deletedAt: string | null; // ISO date string (paranoid mode)
}


// Types for auth responses
export interface UserResponse {
  success?: boolean;
  message: string;
  data?:User
}

//. Types for user payload 
export interface EditUserPayload {
  userId: string,
  data:{
    profile_img: Blob, 
    fullname: string, 
    email: string, 
    role: 'admin' | 'user', 
    bio: string, 
    location: string, 
    password: string 

  }
}

// Auth API Functions
export const userAPI = {
  getUser: async (userId:string) => {
    const response = await fetch(`${SERVER_URL}/api/v1/users/${userId}`, {
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Unable to fetch user");
    }

    return response.json() as Promise<UserResponse>;
  },

  editUser: async ({userId, data}:EditUserPayload) => {
    const response = await fetch(`${SERVER_URL}/api/v1/users/${userId}/edit`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Unable to edit user");
    }

    return response.json() as Promise<UserResponse>;
  },

  deleteUser: async (userId: string) => {
    const response = await fetch(`${SERVER_URL}/api/v1/users/${userId}/delete`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Sign out failed");
    }

    return response.json() as Promise<UserResponse>;
  },

}