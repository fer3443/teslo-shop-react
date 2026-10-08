import { Navigate, useNavigate, useParams } from 'react-router';
import { useProduct } from '@/admin/hooks/useProduct';
import { CustomFullScreenLoading } from '@/components/custom';
import { AdminProductForm } from './ui/AdminProductForm';
import type { Product } from '@/interfaces/product.interface';
import { toast } from 'sonner';

export const AdminProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { isLoading, isError, data: product, productMutation } = useProduct(id || '');
  const productTitle = id === 'new' ? 'Nuevo producto' : 'Editar producto';
  const productSubtitle =
    id === 'new'
      ? 'Aquí puedes crear un nuevo producto.'
      : 'Aquí puedes editar el producto.';

  const handleSubmitForm = async (productLike: Partial<Product> & { files?: File[] }) => {
    await productMutation.mutateAsync(productLike, {
      onSuccess: (data) => {
        toast.success('Acción exitosa', {
          position: 'top-right'
        });
        navigate(`/admin/products/${data.id}`)
      },
      onError: (error) => {
        console.log(error);
        toast.error('Hubo un error', {
          description: <span className='text-slate-900'>Reintente nuevamente</span>,
          position: 'top-right'
        }
        )
      }
    })
  }

  if (isError) {
    return <Navigate to="/admin/products" />
  }
  if (isLoading) return <CustomFullScreenLoading />

  if (!product) {
    return <Navigate to="/admin/products" />
  }

  return (
    <AdminProductForm
      title={productTitle}
      subTitle={productSubtitle}
      product={product}
      onSubmit={handleSubmitForm}
      isSubmitting={productMutation.isPending}
    />
  )
};