import { IRequestResult } from '../types/types';

export async function searchProducts(
  keyword: string,
  setIsLoading: (value: React.SetStateAction<boolean>) => void,
  setIsLoadingPagination: (value: React.SetStateAction<boolean>) => void
): Promise<IRequestResult | null> {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${keyword}`
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
