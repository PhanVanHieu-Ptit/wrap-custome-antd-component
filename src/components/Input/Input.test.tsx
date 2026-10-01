import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Input } from './Input';
import type { InputRef } from './Input.types';

describe('Input', () => {
  it('renders a bare antd input (no wrapper) when no custom prop is used', () => {
    const { container } = render(<Input placeholder="Name" />);
    expect(container.firstElementChild).toHaveClass('ant-input');
  });

  it('exposes the antd InputRef API', () => {
    const ref = createRef<InputRef>();
    render(<Input ref={ref} placeholder="Name" />);
    ref.current?.focus();
    expect(screen.getByPlaceholderText('Name')).toHaveFocus();
  });

  it('associates the label with the input and marks required', async () => {
    render(<Input label="Email" required />);
    const input = screen.getByLabelText(/Email/);
    await userEvent.type(input, 'a@b.c');
    expect(input).toHaveValue('a@b.c');
    expect(input).toBeRequired();
  });

  it('wires helper text via aria-describedby', () => {
    render(<Input label="Email" helperText="We never share it" />);
    expect(screen.getByLabelText('Email')).toHaveAccessibleDescription('We never share it');
  });

  it('shows the error state accessibly and hides helper text', () => {
    render(<Input label="Email" helperText="hint" errorMessage="Invalid email" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Invalid email');
    expect(input).toHaveClass('ant-input-status-error');
    expect(screen.queryByText('hint')).not.toBeInTheDocument();
  });

  it('keeps antd compound components', async () => {
    render(<Input.Password placeholder="Secret" />);
    expect(screen.getByPlaceholderText('Secret')).toHaveAttribute('type', 'password');
  });
});
