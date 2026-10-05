import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Radio } from './Radio';
import type { RadioRef } from './Radio.types';

describe('Radio', () => {
  it('renders the label and selects', async () => {
    render(<Radio>Yes</Radio>);
    await userEvent.click(screen.getByLabelText('Yes'));
    expect(screen.getByLabelText('Yes')).toBeChecked();
  });

  it('exposes the antd ref API', () => {
    const ref = createRef<RadioRef>();
    render(<Radio ref={ref}>Yes</Radio>);
    ref.current?.focus();
    expect(screen.getByRole('radio')).toHaveFocus();
  });

  it('merges className', () => {
    const { container } = render(<Radio className="custom">Yes</Radio>);
    expect(container.firstElementChild).toHaveClass('ant-radio-wrapper', 'custom');
  });

  it('keeps antd Group and Button', async () => {
    const onChange = vi.fn();
    render(
      <Radio.Group onChange={onChange} defaultValue="a">
        <Radio value="a">A</Radio>
        <Radio.Button value="b">B</Radio.Button>
      </Radio.Group>,
    );
    await userEvent.click(screen.getByText('B'));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText('B')).toBeChecked();
  });
});
