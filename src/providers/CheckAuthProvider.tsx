import type { PropsWithChildren } from "react"
import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "@/auth/store"
import { CustomFullScreenLoading } from "@/components/custom"

export const CheckAuthProvider = ({ children }: PropsWithChildren) => {
  const checkoutStatus = useAuthStore(state => state.checkoutStatus)
  const { isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkoutStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5
  })

  if (isLoading) return <CustomFullScreenLoading />;
  return children
}
