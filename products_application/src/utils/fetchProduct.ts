import { IProduct } from '../types/types';

export async function fetchProduct(
  id: number,
  setIsLoadingProduct: (value: React.SetStateAction<boolean>) => void
): Promise<IProduct | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const json = await res.json();
    return json;
  } catch (error) {
    setIsLoadingProduct(false);
    console.log(error);
  }
  return null;
}