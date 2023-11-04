import { IRequestResult } from '../types/types';

export async function searchProducts(
  keyword: string,
  setIsLoading: (value: React.SetStateAction<boolean>) => void,
  setIsLoadingPagination: (value: React.SetStateAction<boolean>) => void,
  currentPage: number,
  productsOnPage: number
): Promise<IRequestResult | null> {
  const skipCount = (currentPage - 1) * productsOnPage;
  const limitCount = currentPage * productsOnPage;
  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${keyword}&limit=${limitCount}&skip=${skipCount}`
    );
    const json = await res.json();
    return json;
  } catch (error) {
    setIsLoading(false);
    setIsLoadingPagination(false);
    console.log(error);
  }
  return null;
}
