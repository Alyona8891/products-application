import { ReadonlyURLSearchParams } from 'next/navigation';

export const handleQueryChange = (
  location: ReadonlyURLSearchParams,
  param: string,
  value: number
) => {
  const params = new URLSearchParams(location);
  params.set(param, value.toString());
  return params.toString();
};
