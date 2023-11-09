import { IProduct } from '../types/types';
import { IRequestResult } from '../types/types';

export async function getProducts(
  currentPage: number,
  productsOnPage: number
): Promise<IRequestResult | null> {
  const skipCount = (currentPage - 1) * productsOnPage;
  const limitCount = productsOnPage;
  try {
    const res = await fetch(
      `https://dummyjson1.com/products?limit=${limitCount}&skip=${skipCount}`
    );
    const json = await res.json();
    return json;
  } catch (error) {
    console.log(error);
  }
  return null;
}

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

export async function searchProducts(
  keyword: string,
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
    console.log(error);
  }
  return null;
}
