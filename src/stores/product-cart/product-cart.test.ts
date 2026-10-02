import type { ProductCart } from '@/domain/products';
import { beforeEach, describe, expect, it } from 'vitest';
import { useProductCart } from './product-cart';

const STORAGE_KEY = 'app-storage-product-cart';

const productA: ProductCart = {
  id: '1',
  brand: 'Brand 1',
  name: 'Product 1',
  colorOption: {
    name: 'Black',
    hexCode: '#000000',
    imageUrl: 'https://example.com/black.jpg',
  },
  storageOption: {
    capacity: '128GB',
    price: 100,
  },
};

const productB: ProductCart = {
  id: '2',
  brand: 'Brand 2',
  name: 'Product 2',
  colorOption: {
    name: 'White',
    hexCode: '#FFFFFF',
    imageUrl: 'https://example.com/white.jpg',
  },
  storageOption: {
    capacity: '256GB',
    price: 200,
  },
};

describe('useProductCart', () => {
  beforeEach(() => {
    localStorage.clear();
    useProductCart.setState({ products: [] });
  });

  it('should start with an empty products list', () => {
    expect(useProductCart.getState().products).toStrictEqual([]);
  });

  it('should hydrate products from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([productA]));

    useProductCart.getState().hydrate();

    expect(useProductCart.getState().products).toStrictEqual([productA]);
  });

  it('should add a product to the cart', () => {
    useProductCart.getState().addProduct(productA);

    expect(useProductCart.getState().products).toStrictEqual([productA]);
  });

  it('should add multiple products to the cart', () => {
    const { addProduct } = useProductCart.getState();

    addProduct(productA);
    addProduct(productB);

    expect(useProductCart.getState().products).toStrictEqual([productA, productB]);
  });

  it('should persist products in localStorage when adding', () => {
    useProductCart.getState().addProduct(productA);

    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toStrictEqual([productA]);
  });

  it('should remove a product from the cart by id', () => {
    const { addProduct, removeProduct } = useProductCart.getState();

    addProduct(productA);
    addProduct(productB);
    removeProduct(productA);

    expect(useProductCart.getState().products).toStrictEqual([productB]);
  });

  it('should persist products in localStorage when removing', () => {
    const { addProduct, removeProduct } = useProductCart.getState();

    addProduct(productA);
    addProduct(productB);
    removeProduct(productA);

    expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toStrictEqual([productB]);
  });

  it('should not change the cart when removing a product that is not present', () => {
    useProductCart.getState().addProduct(productA);
    useProductCart.getState().removeProduct(productB);

    expect(useProductCart.getState().products).toStrictEqual([productA]);
  });
});
