import { AdminTitle } from '@/admin/components/AdminTitle'
import { ProductsTable } from '@/admin/components/table'
import { CustomPagination } from '@/components/custom/CustomPagination'
import { Button } from '@/components/ui/button'
import { useProducts } from '@/shop/hooks'
import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router'

export const AdminProductsPage = () => {
  const { data } = useProducts()
  return (
    <>
      <div className='flex justify-between items-center'>
        <AdminTitle
          title='Productos'
          subtitle='Aquí puedes ver y administrar tus productos'
        />
        <Link to="/admin/products/new" className='mb-10'>
          <Button>
            <PlusIcon className='size-4'/>
            Nuevo Producto
          </Button>
        </Link>
      </div>
      <ProductsTable products={data?.products || []}/>
      <CustomPagination totalPages={data?.pages || 1} />
    </>
  )
}