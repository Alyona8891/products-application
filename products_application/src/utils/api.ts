import { IProduct } from '../types/types';
import { IRequestResult } from '../types/types';

export async function getProducts(
  setIsLoadingProducts: (value: React.SetStateAction<boolean>) => void,
  setIsLoadingPagination: (value: React.SetStateAction<boolean>) => void,
  currentPage: number,
  productsOnPage: number
): Promise<IRequestResult | null> {
  const skipCount = (currentPage - 1) * productsOnPage;
  const limitCount = productsOnPage;
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

export async function getProduct(
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
