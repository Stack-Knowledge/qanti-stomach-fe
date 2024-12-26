import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { get, stomachQueryKeys, stomachUrl } from "@/api/libs";
import { minutesToMs } from "@/utils";
import { Stomach } from "@/types/stomach";

const useGetStomachById = (
  id: number,
  options?: Omit<UseQueryOptions<Stomach[]>, "queryKey">
) => {
  return useQuery({
    queryKey: stomachQueryKeys.getStomachById(id),
    queryFn: () => get<Stomach[]>(stomachUrl.getStomachById(id)),
    staleTime: minutesToMs(1),
    gcTime: minutesToMs(1),
    ...options,
  });
};

export default useGetStomachById;
