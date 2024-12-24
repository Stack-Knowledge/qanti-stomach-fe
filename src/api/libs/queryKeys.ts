export const usersQueryKeys = {
  postSignup: () => ["user", "post", "signup"],
  getUserById: (id: number) => ["user", "get", id],
} as const;

export const stomachQueryKeys = {
  postStomach: () => ["stomach", "post"],
  getStomachById: (id: number) => ["stomach", "get", id],
} as const;
