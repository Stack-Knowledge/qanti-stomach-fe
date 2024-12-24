import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { get, stomachQueryKeys, stomachUrl } from "@/api/libs";
import { minutesToMs } from "@/utils";
import { User } from "@/types/user";

const useGetStomachById = (
  id: number,
  options?: Omit<UseQueryOptions<User>, "queryKey">
) => {
  return useQuery({
    queryKey: stomachQueryKeys.getStomachById(id),
    queryFn: () => get<User>(stomachUrl.getStomachById(id)),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};

export default useGetStomachById;
