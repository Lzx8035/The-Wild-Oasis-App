import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export default function useUser() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
    // 关键是添加这个
    initialData: null,
    // 如果获取用户信息失败，我们认为用户未登录
    onError: () => {
      return null;
    },
  });

  return {
    isLoading: false, // 直接返回 false 避免加载状态
    user,
    isAuthenticated: user?.role === "authenticated",
  };
}
