import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Input } from '../Input';
import { Form } from './Form';

const meta = {
  title: 'Components/Form',
  component: Form,
  args: { layout: 'vertical', style: { maxWidth: 360 } },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Form {...args}>
      <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
        <Input placeholder="you@example.com" />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Sign in
      </Button>
    </Form>
  ),
};
