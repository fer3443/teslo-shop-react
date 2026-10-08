import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../actions/get-products'
import { useParams, useSearchParams } from 'react-router';

export const useProducts = () => {
  const [searchParams] = useSearchParams();
  const { gender } = useParams()
  const limit = searchParams.get('limit') || 9;
  const page = searchParams.get('page') || 1;
  const offset = (Number(page) - 1) * Number(limit);
  const sizesParam = searchParams.get('sizes');
  const sizes = sizesParam
    ? sizesParam.split(',').filter(Boolean).join(',') || undefined
    : undefined;
  const limitPrice = searchParams.get('price') || 'any';
  const [minPrice, maxPrice] =  limitPrice === 'any' ? [undefined, undefined] : limitPrice.split('-');
  const minPriceConvert = minPrice && minPrice?.includes("+") ? 200 : minPrice && !isNaN(+minPrice) ? +minPrice : undefined;
  const query = searchParams.get('query') || ""

  return useQuery({
    queryKey: ['products', { offset, limit, sizes, gender, minPrice, maxPrice, query }],
    queryFn: () => getProducts({
      limit: isNaN(+limit) ? 9 : limit,
      offset: isNaN(offset) ? 0 : offset,
      sizes,
      gender,
      minPrice: minPriceConvert,
      maxPrice: maxPrice ? +maxPrice : undefined,
      q: query
    }),
    staleTime: 1000 * 60 * 5
  })
};