export function getPagesArr(
  productCount: number,
  productsOnPage: number
): number[] {
  if (productCount === 0) {
    return [1];
  }
  const pagesCount = Math.ceil(productCount / productsOnPage);
  console.log(
    Array(pagesCount)
      .fill(1)
      .map((e, i) => i + 1)
  );
  return Array(pagesCount)
    .fill(1)
    .map((e, i) => i + 1);
}
