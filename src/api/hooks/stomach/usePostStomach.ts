import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { stomachQueryKeys, stomachUrl, post } from "@/api/libs";
import { User, CreateUserDto } from "@/types/user";

const usePostStomach = (
  id: number,
  options?: UseMutationOptions<User, AxiosError, CreateUserDto>
) =>
  useMutation({
    mutationKey: stomachQueryKeys.postStomach(),
    mutationFn: (data: CreateUserDto) =>
      post<User>(stomachUrl.postStomach(id), data),
    ...options,
  });

export default usePostStomach;
