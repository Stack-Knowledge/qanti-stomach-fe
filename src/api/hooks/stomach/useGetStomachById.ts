import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { get, stomachQueryKeys, stomachUrl } from "@/api/libs";
import { minutesToMs } from "@/utils";
import { Stomach } from "@/types/stomach";

const useGetStomachById = (
  options?: Omit<UseQueryOptions<Stomach[]>, "queryKey">
) => {
  return useQuery({
    queryKey: stomachQueryKeys.getStomachById(),
    queryFn: () => get<Stomach[]>(stomachUrl.getStomachById()),
    staleTime: minutesToMs(1),
    gcTime: minutesToMs(1),
    ...options,
  });
};

export default useGetStomachById;
