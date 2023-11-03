import { IRequestResult } from '../types/types';

export async function fetchProducts(
  setIsLoading: (value: React.SetStateAction<boolean>) => void
): Promise<IRequestResult | null> {
  try {
    const res = await fetch('https://dummyjson.com/products');
    const json = await res.json();
    return json;
  } catch (error) {
    setIsLoading(false);
    console.log(error);
  }
  return null;
}
