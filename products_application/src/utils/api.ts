import { IProduct, IProducts } from '../types/types';

export async function getProducts(
  keyword: string,
  currentPage: number,
  productsOnPage: number
): Promise<IProducts | null> {
  const skipCount = (currentPage - 1) * productsOnPage;
  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${keyword}&limit=${productsOnPage}&skip=${skipCount}`
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
