export interface IAppState {
  inputValue: string;
  cards: never[] | ICard[];
  isLoading: boolean;
  isNothingFound: boolean;
  isButtonDisabled: boolean;
}

export interface ICard {
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
