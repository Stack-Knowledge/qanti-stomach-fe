import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { stomachQueryKeys, stomachUrl, post } from "@/api/libs";
import { Stomach, CreateStomachDto } from "@/types/stomach";

const usePostStomach = (
  id: number,
  options?: UseMutationOptions<Stomach, AxiosError, CreateStomachDto>
) =>
  useMutation({
    mutationKey: stomachQueryKeys.postStomach(),
    mutationFn: (data: CreateStomachDto) =>
      post<Stomach>(stomachUrl.postStomach(), data),
    ...options,
  });

export default usePostStomach;
