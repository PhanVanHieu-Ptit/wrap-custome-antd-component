import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { Select } from './Select';
import type { SelectRef } from './Select.types';

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
];

describe('Select', () => {
  it('renders a bare antd select (no wrapper) when no custom prop is used', () => {
    const { container } = render(<Select options={options} />);
    expect(container.firstElementChild).toHaveClass('ant-select');
  });

  it('exposes the antd select ref API', () => {
    const ref = createRef<SelectRef>();
    render(<Select ref={ref} options={options} />);
    ref.current?.focus();
    expect(screen.getByRole('combobox')).toHaveFocus();
  });

  it('merges className and shows the selected value', () => {
    const { container } = render(<Select options={options} value="b" className="custom" />);
    expect(container.firstElementChild).toHaveClass('custom');
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('associates the label with the combobox', () => {
    render(<Select label="Letter" options={options} />);
    expect(screen.getByLabelText('Letter')).toBe(screen.getByRole('combobox'));
  });

  it('wires helper text and error state', () => {
    const { rerender } = render(<Select label="Letter" helperText="Pick one" options={options} />);
    expect(screen.getByText('Pick one')).toBeInTheDocument();
    rerender(
      <Select label="Letter" helperText="Pick one" errorMessage="Required" options={options} />,
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.queryByText('Pick one')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('keeps antd compound components', () => {
    expect(Select.Option).toBeDefined();
    expect(Select.OptGroup).toBeDefined();
  });
});
