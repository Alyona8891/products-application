import { setupServer } from 'msw/node';

import { http, HttpResponse } from 'msw';
import { mockProduct, mockRequestResult } from './mockData';

export const handlers = [
  http.get('https://dummyjson.com/products/search*', () => {
    return HttpResponse.json(mockRequestResult);
  }),
  http.get('https://dummyjson.com/products/*', () => {
    return HttpResponse.json(mockProduct);
  }),
];
export const server = setupServer(...handlers);
