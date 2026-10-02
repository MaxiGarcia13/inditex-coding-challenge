export interface ProductBase {
  id: string;
  brand: string;
  name: string;
  basePrice: number;
}

export interface ProductSummary extends ProductBase {
  imageUrl: string;
}

export interface ProductDetail extends ProductBase {
  description: string;
  rating: number;
  specs: {
    screen: string;
    resolution: string;
    processor: string;
    mainCamera: string;
    selfieCamera: string;
    battery: string;
    os: string;
    screenRefreshRate: string;
  };
  colorOptions: [
    {
      name: string;
      hexCode: string;
      imageUrl: string;
    },
  ];
  storageOptions: [
    {
      capacity: string;
      price: number;
    },
  ];
  similarProducts: Array<ProductSummary>;
}
