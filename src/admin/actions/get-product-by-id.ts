import { tesloApi } from "@/api/testlo-api";
import type { Product } from "@/interfaces/product.interface";

export const getProductById = async (id: string): Promise<Product> => {
  if (!id) throw new Error('Id is required');
  if (id === 'new') {
    return {
      id: 'new',
      title: '',
      description: '',
      slug: '',
      stock: 0,
      price: 0,
      gender: 'men',
      sizes: [],
      tags: [],
      images: []
    } as unknown as Product
  }

  const { data } = await tesloApi.get<Product>(`/products/${id}`);
  const images = data.images.map((img) => {
    if (img.includes('http')) return img;
    return `${import.meta.env.VITE_API_URL}/files/product/${img}`
  });
  return {
    ...data,
    images
  }
}