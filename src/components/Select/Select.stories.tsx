import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select } from './Select';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  args: { options, placeholder: 'Select…', style: { width: 240 } },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
export const WithLabel: Story = {
  args: { label: 'Framework', helperText: 'Pick your favourite' },
};
export const WithError: Story = { args: { label: 'Framework', errorMessage: 'Required' } };
export const Multiple: Story = { args: { mode: 'multiple', label: 'Frameworks' } };
