import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,

    retry: false,
    staleTime: 1000 * 60 * 5,
    onError: () => {},
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
