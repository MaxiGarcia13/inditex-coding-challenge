import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SearchInput } from './search-input';

describe('searchInput', () => {
  it('should call onSearch when the user types', async () => {
    const onSearch = vi.fn();

    const user = userEvent.setup();

    render(<SearchInput onSearch={onSearch} />);
    const input = screen.getByRole('search');

    await user.type(input, 'test');

    expect(onSearch).toHaveBeenCalledTimes(0);

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('test');
      expect(onSearch).toHaveBeenCalledTimes(1);
    });
  });

  it('should set the search value when the user types', async () => {
    const onSearch = vi.fn();

    const user = userEvent.setup();

    render(<SearchInput onSearch={onSearch} />);

    const input = screen.getByRole('search');

    await user.type(input, 'test');

    expect(input).toHaveValue('test');
  });
});
