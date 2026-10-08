import { tesloApi } from "@/api/testlo-api";
import type { Product } from "@/interfaces/product.interface";

// export const createProduct = async (product: Partial<Product>): Promise<Product> => {
//   const {id, user, images = [], ...rest} = product;
//   rest.stock = Number(rest.stock || 0)
//   rest.price = Number(rest.price || 0)
//   try {
//     const { data } = await tesloApi.post<Product>('/products', {
//       rest
//     });
//     return {
//       ...data,
//       images: data.images.map((image) => {
//         if (image.includes('http')) return image;
//         return `${import.meta.env.VITE_API_URL}/files/product/${image}`
//       })
//     }
//   } catch (error) {
//     throw error
//   }
// };

// export const updateProduct = async (product: Partial<Product>): Promise<Product> => {
//   const {id, user, images = [], ...rest} = product;
//   rest.stock = Number(rest.stock || 0)
//   rest.price = Number(rest.price || 0)
//   try {
//     const { data } = await tesloApi.patch<Product>(`/product/${product.id}`, {
//       rest
//     });
//     return {
//       ...data,
//       images: data.images.map((image) => {
//         if (image.includes('http')) return image;
//         return `${import.meta.env.VITE_API_URL}/files/product/${image}`
//       })
//     }
//   } catch (error) {
//     throw error
//   }
// }
export const createUpdateProduct = async (productLike: Partial<Product> & { files?: File[] }): Promise<Product> => {
  const { id, user, images = [], files = [], ...rest } = productLike;
  console.log({ files })
  const isCreating = id === 'new';
  rest.stock = Number(rest.stock || 0)
  rest.price = Number(rest.price || 0);

  //preparo imagenes
  if (files.length > 0) {
    const newImagesNames = await uploadFiles(files);
    images.push(...newImagesNames)
  }

  const imagesToSave = images.map((image) => {
    if (image.includes('http')) return image.split('/').pop() || '';
    return image;
  })

  const { data } = await tesloApi<Product>({
    url: isCreating ? '/products' : `/products/${id}`,
    method: isCreating ? 'POST' : 'PATCH',
    data: {
      ...rest,
      images: imagesToSave
    }
  });

  return {
    ...data,
    images: data.images.map((image) => {
      if (image.includes('http')) return image;
      return `/${import.meta.env.VITE_API_URL}/files/product/${image}`
    })
  }
}

interface FileUploadResponse {
  secureUrl: string;
  fileName: string;
}

const uploadFiles = async (files: File[]) => {
  const uploadPromises = files.map(async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await tesloApi.post<FileUploadResponse>('/files/product', formData);
    return data.fileName;
  })
  const uploadedFilesNames = await Promise.all(uploadPromises);
  return uploadedFilesNames
} 