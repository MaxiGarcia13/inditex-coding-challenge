import type { ProductCart } from '@/domain/products';
import { createStorage } from '@maxigarcia/js-utils';
import { create } from 'zustand';
import { createProductKey } from '@/domain/products';

type ProductCartInput = Omit<ProductCart, 'key' | 'quantity'>;

interface ProductCartState {
  products: ProductCart[];
  totalPrice: number;
  totalQuantity: number;
  hydrate: () => void;
  addProduct: (product: ProductCartInput) => void;
  removeProduct: (product: ProductCart) => void;
}

const storage = createStorage<ProductCart[]>('product-cart');

export const useProductCart = create<ProductCartState>((set) => ({
  products: [],
  totalPrice: 0,
  totalQuantity: 0,
  hydrate: () => {
    const products = storage.getJson() ?? [];
    set(() => commit(products));
  },
  addProduct: (product) => set((state) => {
    const key = createProductKey(product);
    const alreadyInCart = state.products.some((p) => p.key === key);

    const products = alreadyInCart
      ? adjustQuantity(state.products, key, 1)
      : [...state.products, { ...product, key, quantity: 1 }];

    return commit(products);
  }),
  removeProduct: (product) => set((state) => {
    if (!state.products.some((p) => p.key === product.key)) {
      return state;
    }

    return commit(adjustQuantity(state.products, product.key, -1));
  }),
}));

function adjustQuantity(
  products: ProductCart[],
  key: string,
  delta: number,
): ProductCart[] {
  return products.flatMap((product) => {
    if (product.key !== key) {
      return product;
    }

    const quantity = product.quantity + delta;

    return quantity > 0 ? { ...product, quantity } : [];
  });
}

function commit(products: ProductCart[]) {
  storage.setJson(products);

  const totalPrice = products.reduce((acc, product) => acc + product.storageOption.price * product.quantity, 0);
  const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);

  return {
    products,
    totalPrice,
    totalQuantity,
  };
}
