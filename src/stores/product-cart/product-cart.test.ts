import type { ProductCart } from '@/domain/products';
import { beforeEach, describe, expect, it } from 'vitest';
import { useProductCart } from './product-cart';

const STORAGE_KEY = 'app-storage-product-cart';

type ProductInput = Omit<ProductCart, 'key' | 'quantity'>;

const productA: ProductInput = {
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

const productAWhite: ProductInput = {
  ...productA,
  colorOption: {
    name: 'White',
    hexCode: '#FFFFFF',
    imageUrl: 'https://example.com/white.jpg',
  },
};

const productB: ProductInput = {
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

const productAKey = '1-128GB-Black';
const productAWhiteKey = '1-128GB-White';
const productBKey = '2-256GB-White';

const cartProductA: ProductCart = {
  ...productA,
  key: productAKey,
  quantity: 1,
};

const cartProductB: ProductCart = {
  ...productB,
  key: productBKey,
  quantity: 1,
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
    localStorage.setItem(STORAGE_KEY, JSON.stringify([cartProductA]));

    useProductCart.getState().hydrate();

    expect(useProductCart.getState().products).toStrictEqual([cartProductA]);
  });

  describe('addProduct', () => {
    it('should add a product with quantity 1 and a composite key', () => {
      useProductCart.getState().addProduct(productA);

      expect(useProductCart.getState().products).toStrictEqual([cartProductA]);
    });

    it('should add multiple different products to the cart', () => {
      const { addProduct } = useProductCart.getState();

      addProduct(productA);
      addProduct(productB);

      expect(useProductCart.getState().products).toStrictEqual([
        cartProductA,
        cartProductB,
      ]);
    });

    it('should increment quantity when adding the same product variant again', () => {
      const { addProduct } = useProductCart.getState();

      addProduct(productA);
      addProduct(productA);

      expect(useProductCart.getState().products).toStrictEqual([
        { ...cartProductA, quantity: 2 },
      ]);
    });

    it('should treat different color options as separate cart items', () => {
      const { addProduct } = useProductCart.getState();

      addProduct(productA);
      addProduct(productAWhite);

      expect(useProductCart.getState().products).toStrictEqual([
        cartProductA,
        {
          ...productAWhite,
          key: productAWhiteKey,
          quantity: 1,
        },
      ]);
    });

    it('should persist products in localStorage when adding', () => {
      useProductCart.getState().addProduct(productA);

      expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toStrictEqual([
        cartProductA,
      ]);
    });

    it('should persist updated quantity in localStorage when incrementing', () => {
      const { addProduct } = useProductCart.getState();

      addProduct(productA);
      addProduct(productA);

      expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toStrictEqual([
        { ...cartProductA, quantity: 2 },
      ]);
    });
  });

  describe('removeProduct', () => {
    it('should remove a product from the cart when quantity is 1', () => {
      const { addProduct, removeProduct } = useProductCart.getState();

      addProduct(productA);
      addProduct(productB);
      removeProduct(useProductCart.getState().products[0]);

      expect(useProductCart.getState().products).toStrictEqual([cartProductB]);
    });

    it('should decrement quantity when removing a product with quantity greater than 1', () => {
      const { addProduct, removeProduct } = useProductCart.getState();

      addProduct(productA);
      addProduct(productA);
      addProduct(productA);

      removeProduct(useProductCart.getState().products[0]);

      expect(useProductCart.getState().products).toStrictEqual([
        { ...cartProductA, quantity: 2 },
      ]);
    });

    it('should remove the product after decrementing quantity down to 0', () => {
      const { addProduct, removeProduct } = useProductCart.getState();

      addProduct(productA);
      addProduct(productA);

      removeProduct(useProductCart.getState().products[0]);
      removeProduct(useProductCart.getState().products[0]);

      expect(useProductCart.getState().products).toStrictEqual([]);
    });

    it('should persist products in localStorage when removing', () => {
      const { addProduct, removeProduct } = useProductCart.getState();

      addProduct(productA);
      addProduct(productB);
      removeProduct(useProductCart.getState().products[0]);

      expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toStrictEqual([
        cartProductB,
      ]);
    });

    it('should persist decremented quantity in localStorage', () => {
      const { addProduct, removeProduct } = useProductCart.getState();

      addProduct(productA);
      addProduct(productA);
      removeProduct(useProductCart.getState().products[0]);

      expect(JSON.parse(localStorage.getItem(STORAGE_KEY)!)).toStrictEqual([
        cartProductA,
      ]);
    });

    it('should not change the cart when removing a product that is not present', () => {
      useProductCart.getState().addProduct(productA);
      useProductCart.getState().removeProduct(cartProductB);

      expect(useProductCart.getState().products).toStrictEqual([cartProductA]);
    });
  });
});
