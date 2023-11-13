export const mockRequestResult = {
  total: 3,
  products: [
    {
      id: 1,
      title: 'iPhone 9',
      text: '',
      description:
        'An apple mobile which is nothing like apple Loremdcccccccccccccccccccccccccccccccccccc',
      images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
    },
    {
      id: 2,
      title: 'iPhone 10',
      text: '',
      description: 'An apple mobile which is nothing like apple',
      images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
    },
    {
      id: 3,
      title: 'iPhone 11',
      text: '',
      description: 'An apple mobile which is nothing like apple',
      images: ['https://i.dummyjson.com/data/products/1/1.jpg'],
    },
  ],
};

export const mockProduct = {
  id: 1,
  title: 'dress',
  text: 'for Woman',
  images: ['for Woman'],
  description: 'for Woman',
};

export const mockEmptyProductsData = { products: [], total: 0 };

export const mockEmptyContext = {
  productsData: mockEmptyProductsData,
  isLoadingProducts: false,
  isLoadingPagination: false,
  getProductsData: () => {},
  setIsLoadingProducts: () => {},
  inputValue: '',
  setInputValue: () => {},
  quantityProductsOnPage: 10,
  setProductsOnPage: () => {},
};

export const mockContext = {
  productsData: {
    products: [
      {
        id: 1,
        title: 'ijivjri',
        text: 'okcovo',
        images: ['ofo'],
        description: 'okcovo',
      },
      {
        id: 2,
        title: 'efe',
        text: 'efef',
        images: ['efefe'],
        description: 'efefe',
      },
      {
        id: 3,
        title: 'efe',
        text: 'efef',
        images: ['efefe'],
        description: 'efefe',
      },
    ],
    total: 1,
  },
  isLoadingProducts: false,
  isLoadingPagination: false,
  getProductsData: () => {},
  setIsLoadingProducts: () => {},
  inputValue: '',
  setInputValue: () => {},
  quantityProductsOnPage: 10,
  setProductsOnPage: () => {},
};
