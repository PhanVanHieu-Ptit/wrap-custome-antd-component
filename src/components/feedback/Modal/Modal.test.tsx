import { render, screen } from '@testing-library/react';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders centered by default', () => {
    render(
      <Modal open title="Hello">
        Body
      </Modal>,
    );
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(document.querySelector('.ant-modal-centered')).not.toBeNull();
  });

  it('lets callers opt out of the defaults', () => {
    render(
      <Modal open centered={false} title="Hello">
        Body
      </Modal>,
    );
    expect(document.querySelector('.ant-modal-centered')).toBeNull();
  });

  it('keeps antd static helpers', () => {
    expect(typeof Modal.confirm).toBe('function');
    expect(typeof Modal.useModal).toBe('function');
  });
});
