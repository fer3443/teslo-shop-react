import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomJumbotron, ProductsGrid } from "@/shop/components"
import { useProducts } from "@/shop/hooks/useProducts"

export const HomePage = () => {
  const { data } = useProducts()
  return (
    <>
      <CustomJumbotron title="Todos los productos"/>
      <ProductsGrid products={data?.products || []}/>
      <CustomPagination totalPages={data?.pages || 0}/>
    </>
  )
}
