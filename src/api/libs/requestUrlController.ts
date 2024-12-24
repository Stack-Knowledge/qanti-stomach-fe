export const usersUrl = {
  postSignup: () => "/users",
  getUserById: (id: number) => `/users/${id}`,
  getMe: () => `/users/me`,
} as const;

export const stomachUrl = {
  postStomach: () => "/stomach",
  getStomachById: (id: number) => `/stomach/${id}`,
} as const;
