import { IRequestResult } from '../types/types';

export async function fetchProducts(
  setIsLoadingProducts: (value: React.SetStateAction<boolean>) => void,
  setIsLoadingPagination: (value: React.SetStateAction<boolean>) => void,
  currentPage: number,
  productsOnPage: number
): Promise<IRequestResult | null> {
  const skipCount = (currentPage - 1) * productsOnPage;
  const limitCount = currentPage * productsOnPage;
  try {
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limitCount}&skip=${skipCount}`
    );
    const json = await res.json();
    return json;
  } catch (error) {
    setIsLoadingProducts(false);
    setIsLoadingPagination(false);
    console.log(error);
  }
  return null;
}
