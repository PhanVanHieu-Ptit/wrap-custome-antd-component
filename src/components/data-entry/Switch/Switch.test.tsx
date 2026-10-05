import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Switch } from './Switch';
import type { SwitchRef } from './Switch.types';

describe('Switch', () => {
  it('toggles and calls onChange', async () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalledWith(true, expect.anything());
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('exposes the antd ref API', () => {
    const ref = createRef<SwitchRef>();
    render(<Switch ref={ref} />);
    ref.current?.focus();
    expect(screen.getByRole('switch')).toHaveFocus();
  });

  it('merges className and respects disabled', () => {
    render(<Switch className="custom" disabled />);
    expect(screen.getByRole('switch')).toHaveClass('custom');
    expect(screen.getByRole('switch')).toBeDisabled();
  });
});
