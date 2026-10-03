import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  args: { children: 'Option' },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const Group: Story = {
  render: () => (
    <Radio.Group defaultValue="a">
      <Radio value="a">A</Radio>
      <Radio value="b">B</Radio>
      <Radio value="c">C</Radio>
    </Radio.Group>
  ),
};
export const ButtonStyle: Story = {
  render: () => (
    <Radio.Group defaultValue="a" buttonStyle="solid">
      <Radio.Button value="a">Day</Radio.Button>
      <Radio.Button value="b">Week</Radio.Button>
      <Radio.Button value="c">Month</Radio.Button>
    </Radio.Group>
  ),
};
