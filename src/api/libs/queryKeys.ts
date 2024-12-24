export const usersQueryKeys = {
  postSignup: () => ["user", "post", "signup"],
  getUserById: (id: number) => ["user", "get", id],
} as const;
