import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createUpdateProduct, getProductById } from '../actions'

export const useProduct = (id: string) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['product', { id }],
    queryFn: () => getProductById(id),
    retry: false,
    staleTime: 1000 * 60 * 2,
  });

  const productMutation = useMutation({
    mutationFn: createUpdateProduct,
    onSuccess: (product) => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
      queryClient.invalidateQueries({ queryKey: ['product', { id: product.id }] })
      queryClient.setQueryData(['products', { id: product.id }], product)
    }
  })

  return {
    ...query,
    productMutation
  }
}
