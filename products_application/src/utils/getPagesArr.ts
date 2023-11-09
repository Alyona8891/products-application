export function getPagesArr(
  productCount: number,
  productsOnPage: number
): number[] {
  if (productCount === 0) {
    return [1];
  }
  const pagesCount = Math.ceil(productCount / productsOnPage);
  return Array(pagesCount)
    .fill(1)
    .map((e, i) => i + 1);
}
