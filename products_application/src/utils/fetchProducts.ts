import { IRequestResult } from '../types/types';

export async function fetchProducts(
  setIsLoading: (value: React.SetStateAction<boolean>) => void,
  currentPage: number,
  productsOnPage: number
): Promise<IRequestResult | null> {
  try {
    const skipCount = (currentPage - 1) * productsOnPage;
    const limitCount = currentPage * productsOnPage;
    const res = await fetch(
      `https://dummyjson.com/products?limit=${limitCount}&skip=${skipCount}`
    );
    const json = await res.json();
    return json;
  } catch (error) {
    setIsLoading(false);
    console.log(error);
  }
  return null;
}
