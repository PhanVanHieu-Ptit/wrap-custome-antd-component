import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Checkbox } from './Checkbox';
import type { CheckboxRef } from './Checkbox.types';

describe('Checkbox', () => {
  it('renders the label and toggles', async () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange}>Accept</Checkbox>);
    await userEvent.click(screen.getByLabelText('Accept'));
    expect(screen.getByLabelText('Accept')).toBeChecked();
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('exposes the antd ref API', () => {
    const ref = createRef<CheckboxRef>();
    render(<Checkbox ref={ref}>Accept</Checkbox>);
    ref.current?.focus();
    expect(screen.getByRole('checkbox')).toHaveFocus();
  });

  it('merges className', () => {
    const { container } = render(<Checkbox className="custom">Accept</Checkbox>);
    expect(container.firstElementChild).toHaveClass('ant-checkbox-wrapper', 'custom');
  });

  it('keeps antd Group', async () => {
    render(<Checkbox.Group options={['A', 'B']} defaultValue={['A']} />);
    expect(screen.getByLabelText('A')).toBeChecked();
    expect(screen.getByLabelText('B')).not.toBeChecked();
  });
});
