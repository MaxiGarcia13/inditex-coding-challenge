import type { ProductDetail } from '@/domain/products';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ProductForm } from './product-form';

const product = {
  id: '1',
  brand: 'Brand 1',
  name: 'Product 1',
  basePrice: 100,
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

  it('should show the selected storage price instead of the base price', async () => {
    const user = userEvent.setup();

    render(<ProductForm product={product} />);

    expect(screen.getByText('From 100 EUR')).toBeInTheDocument();

    await user.click(screen.getByRole('radio', { name: '256GB' }));

    expect(screen.getByText('200 EUR')).toBeInTheDocument();
    expect(screen.queryByText('From 100 EUR')).not.toBeInTheDocument();
  });
});
