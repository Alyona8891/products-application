import { IProduct, IRequestResult } from '../../types/types';

export function createFetchResponse(data: IRequestResult | IProduct) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}
