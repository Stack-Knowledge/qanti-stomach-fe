export const usersUrl = {
  postSignup: () => "/users",
  getUserById: (id: number) => `/users/${id}`,
} as const;
