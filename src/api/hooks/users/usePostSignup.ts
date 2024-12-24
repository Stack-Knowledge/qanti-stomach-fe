import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { usersQueryKeys, usersUrl, post } from "@/api/libs";
import { User, CreateUserDto } from "@/types/user";

const usePostSignup = (
  options?: UseMutationOptions<User, AxiosError, CreateUserDto>
) =>
  useMutation({
    mutationKey: usersQueryKeys.postSignup(),
    mutationFn: (data: CreateUserDto) =>
      post<User>(usersUrl.postSignup(), data),
    ...options,
  });

export default usePostSignup;
