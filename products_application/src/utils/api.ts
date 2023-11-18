import { IProduct } from '../types/types';

export async function getProduct(id: number): Promise<IProduct | null> {
  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
  return null;
}
