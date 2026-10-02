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
  colorOptions: Array<ProductColorOption>;
  storageOptions: Array<ProductStorageOption>;
  similarProducts: Array<ProductSummary>;
}

export interface ProductColorOption {
  name: string;
  hexCode: string;
  imageUrl: string;
}

export interface ProductStorageOption {
  capacity: string;
  price: number;
}

export interface ProductCart extends Omit<ProductBase, 'basePrice'> {
  key: string;
  colorOption: ProductColorOption;
  storageOption: ProductStorageOption;
  quantity: number;
}
