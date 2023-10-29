import React, { Component, ErrorInfo } from 'react';
import { IErrorBoundaryProps, IErrorBoundaryState } from '../../types';

export class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState,
  string
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error);
    console.log(info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please, try later!</h1>;
    }

    return this.props.children;
  }
}
