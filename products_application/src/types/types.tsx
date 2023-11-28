import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface IResponse {
  data: IRequestResult;
  error: FetchBaseQueryError | SerializedError | undefined;
}

export interface IRequestResult {
  total: number;
  products: IProduct[] | [];
}

export interface IProduct {
  id: number;
  title: string;
  text: string;
  images: string[];
  description: string;
}

export interface IErrorBoundaryProps {
  children: React.ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
}
