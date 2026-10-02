import type { ProductCart } from '@/domain/products';
import { createStorage } from '@maxigarcia/js-utils';
import { create } from 'zustand';

interface ProductCartState {
  products: ProductCart[];
  addProduct: (product: ProductCart) => void;
  removeProduct: (product: ProductCart) => void;
}

const storage = createStorage<ProductCart[]>('product-cart');

export const useProductCart = create<ProductCartState>((set) => {
  return ({
    products: storage.getJson() ?? [],
    addProduct: (product) => set((state) => {
      const products = [...state.products, product];

      storage.setJson(products);
      return { products };
    }),
    removeProduct: (product) => set((state) => {
      const products = state.products.filter((p) => p.id !== product.id);
      storage.setJson(products);
      return { products };
    }),
  });
});
