import { render, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import { createRef } from 'react';
import { DatePicker } from './DatePicker';
import type { DatePickerRef } from './DatePicker.types';

describe('DatePicker', () => {
  it('renders a bare antd picker (no wrapper) when no custom prop is used', () => {
    const { container } = render(<DatePicker />);
    expect(container.firstElementChild).toHaveClass('ant-picker');
  });

  it('forwards ref and merges className', () => {
    const ref = createRef<DatePickerRef>();
    const { container } = render(<DatePicker ref={ref} className="custom" />);
    expect(container.firstElementChild).toHaveClass('custom');
    ref.current?.focus();
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('shows the given value', () => {
    render(<DatePicker value={dayjs('2024-05-06')} format="YYYY-MM-DD" />);
    expect(screen.getByRole('textbox')).toHaveValue('2024-05-06');
  });

  it('associates the label with the input', () => {
    render(<DatePicker label="Birthday" />);
    expect(screen.getByLabelText('Birthday')).toBe(screen.getByRole('textbox'));
  });

  it('wires helper text and error state', () => {
    const { rerender } = render(<DatePicker label="Birthday" helperText="dd/mm" />);
    expect(screen.getByText('dd/mm')).toBeInTheDocument();
    rerender(<DatePicker label="Birthday" helperText="dd/mm" errorMessage="Invalid date" />);
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
    expect(screen.queryByText('dd/mm')).not.toBeInTheDocument();
    expect(screen.getByRole('textbox').closest('.ant-picker')).toHaveClass(
      'ant-picker-status-error',
    );
  });

  it('keeps antd compound components', () => {
    render(<DatePicker.RangePicker />);
    expect(screen.getAllByRole('textbox')).toHaveLength(2);
  });
});
