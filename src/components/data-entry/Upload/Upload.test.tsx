import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Upload } from './Upload';

const input = (container: HTMLElement) =>
  container.querySelector('input[type="file"]') as HTMLInputElement;

describe('Upload', () => {
  it('drops files over maxSize and reports them', async () => {
    const onReject = vi.fn();
    const onChange = vi.fn();
    const { container } = render(
      <Upload maxSize={4} onReject={onReject} onChange={onChange} beforeUpload={() => false}>
        <button type="button">Pick</button>
      </Upload>,
    );
    await userEvent.upload(input(container), new File(['too large'], 'big.txt'));
    expect(onReject).toHaveBeenCalledWith(expect.objectContaining({ name: 'big.txt' }), 'size');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('delegates to the caller beforeUpload for files within the limit', async () => {
    const beforeUpload = vi.fn(() => false as const);
    const onReject = vi.fn();
    const { container } = render(
      <Upload maxSize={100} onReject={onReject} beforeUpload={beforeUpload}>
        <button type="button">Pick</button>
      </Upload>,
    );
    await userEvent.upload(input(container), new File(['ok'], 'ok.txt'));
    expect(beforeUpload).toHaveBeenCalledTimes(1);
    expect(onReject).not.toHaveBeenCalled();
  });

  it('keeps Dragger and LIST_IGNORE', () => {
    expect(Upload.Dragger).toBeDefined();
    expect(typeof Upload.LIST_IGNORE).toBe('string');
  });
});
