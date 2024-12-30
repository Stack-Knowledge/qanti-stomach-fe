export const usersQueryKeys = {
  postSignup: () => ["user", "post", "signup"],
  getUserById: (id: number) => ["user", "get", id],
} as const;

export const stomachQueryKeys = {
  postStomach: () => ["stomach", "post"],
  getStomachById: () => ["stomach", "get"],
} as const;
