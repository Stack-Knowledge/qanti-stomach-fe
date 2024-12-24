import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { get, usersQueryKeys, usersUrl } from "@/api/libs";
import { minutesToMs } from "@/utils";
import { User } from "@/types/user";

const useGetMe = (
  id: number,
  options?: Omit<UseQueryOptions<User>, "queryKey">
) => {
  return useQuery({
    queryKey: usersQueryKeys.getUserById(id),
    queryFn: () => get<User>(usersUrl.getUserById(id)),
    staleTime: minutesToMs(5),
    gcTime: minutesToMs(5),
    ...options,
  });
};

export default useGetMe;
