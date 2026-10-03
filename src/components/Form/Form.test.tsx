import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { Form } from './Form';
import type { FormRef } from './Form.types';
import { Input } from '../Input';

describe('Form', () => {
  it('submits values through antd Form.Item', async () => {
    const onFinish = vi.fn();
    render(
      <Form onFinish={onFinish}>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <button type="submit">Send</button>
      </Form>,
    );
    await userEvent.type(screen.getByLabelText('Email'), 'a@b.c');
    await userEvent.click(screen.getByText('Send'));
    await waitFor(() => expect(onFinish).toHaveBeenCalledWith({ email: 'a@b.c' }));
  });

  it('forwards the FormInstance ref', async () => {
    const ref = createRef<FormRef>();
    render(
      <Form ref={ref} initialValues={{ name: 'x' }}>
        <Form.Item name="name">
          <Input />
        </Form.Item>
      </Form>,
    );
    expect(ref.current?.getFieldValue('name')).toBe('x');
  });

  it('merges className and keeps validation rules', async () => {
    const { container } = render(
      <Form className="custom">
        <Form.Item name="n" label="N" rules={[{ required: true, message: 'Required' }]}>
          <Input />
        </Form.Item>
        <button type="submit">Send</button>
      </Form>,
    );
    expect(container.firstElementChild).toHaveClass('ant-form', 'custom');
    await userEvent.click(screen.getByText('Send'));
    expect(await screen.findByText('Required')).toBeInTheDocument();
  });
});
