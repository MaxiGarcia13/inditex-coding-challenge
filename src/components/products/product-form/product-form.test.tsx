import type { ProductDetail } from '@/domain/products';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ProductForm } from './product-form';

const product = {
  id: '1',
  brand: 'Brand 1',
  name: 'Product 1',
  colorOptions: [
    { name: 'Black', hexCode: '#000000', imageUrl: 'https://via.placeholder.com/150' },
  ],
  storageOptions: [{ capacity: '128GB', price: 100 }, { capacity: '256GB', price: 200 }],
} as ProductDetail;

describe('productForm', () => {
  it('should enable the add to cart button when storage is selected', async () => {
    const user = userEvent.setup();

    render(<ProductForm product={product} />);

    const button = screen.getByRole('button', { name: 'Add to cart' });
    const storageOption = screen.getByRole('radio', { name: '256GB' });

    expect(button).toBeDisabled();

    await user.click(storageOption);

    expect(button).toBeEnabled();
  });
});
