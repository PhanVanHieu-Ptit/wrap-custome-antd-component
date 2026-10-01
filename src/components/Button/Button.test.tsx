import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { expectTypeOf } from 'vitest';
import { Button } from './Button';
import type { ButtonProps, ButtonRef } from './Button.types';

describe('Button', () => {
  it('renders children and forwards antd props', async () => {
    const onClick = vi.fn();
    render(
      <Button type="primary" danger onClick={onClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveClass('ant-btn-dangerous');
    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('forwards the ref to the underlying element', () => {
    const ref = createRef<ButtonRef>();
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('merges a consumer className with the library style', () => {
    render(<Button className="custom">Styled</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom');
    expect(button.className.split(' ').length).toBeGreaterThan(2);
  });

  it('shows loadingText while loading', () => {
    render(
      <Button loading loadingText="Saving…">
        Save
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveTextContent('Saving…');
  });

  it('autoLoading keeps the button loading until the promise settles', async () => {
    let resolve!: () => void;
    const onClick = () => new Promise<void>((r) => (resolve = r));
    render(
      <Button autoLoading loadingText="Saving…" onClick={onClick}>
        Save
      </Button>,
    );

    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveTextContent('Saving…');
    expect(screen.getByRole('button')).toHaveClass('ant-btn-loading');

    resolve();
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('Save'));
  });

  it('keeps antd prop types', () => {
    expectTypeOf<ButtonProps['type']>().toEqualTypeOf<
      'primary' | 'dashed' | 'link' | 'text' | 'default' | undefined
    >();
    expectTypeOf<ButtonProps['danger']>().toEqualTypeOf<boolean | undefined>();
    expectTypeOf<ButtonProps['loadingText']>().not.toBeAny();
  });
});
