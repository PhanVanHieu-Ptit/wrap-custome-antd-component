import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { InputNumber } from './InputNumber';
import type { InputNumberRef } from './InputNumber.types';

describe('InputNumber', () => {
  it('renders a bare antd input number (no wrapper) when no custom prop is used', () => {
    const { container } = render(<InputNumber />);
    expect(container.firstElementChild).toHaveClass('ant-input-number');
  });

  it('exposes the antd ref API', () => {
    const ref = createRef<InputNumberRef>();
    render(<InputNumber ref={ref} />);
    ref.current?.focus();
    expect(screen.getByRole('spinbutton')).toHaveFocus();
  });

  it('forwards props and merges className', async () => {
    const onChange = vi.fn();
    const { container } = render(<InputNumber className="custom" onChange={onChange} />);
    expect(container.firstElementChild).toHaveClass('custom');
    await userEvent.type(screen.getByRole('spinbutton'), '12');
    expect(onChange).toHaveBeenLastCalledWith(12);
  });

  it('associates the label with the input', () => {
    render(<InputNumber label="Age" />);
    expect(screen.getByLabelText('Age')).toBe(screen.getByRole('spinbutton'));
  });

  it('wires helper text and error state', () => {
    const { rerender } = render(<InputNumber label="Age" helperText="Years" />);
    expect(screen.getByLabelText('Age')).toHaveAccessibleDescription('Years');
    rerender(<InputNumber label="Age" helperText="Years" errorMessage="Too low" />);
    const input = screen.getByLabelText('Age');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Too low');
  });
});
