import { Modal as AntModal } from 'antd';
import type { ReactElement } from 'react';
import type { ModalProps } from './Modal.types';

// Library defaults; both can be overridden per modal. Static helpers (`Modal.confirm` …) are antd's own.
function ModalBase({ centered = true, destroyOnHidden = true, ...rest }: ModalProps): ReactElement {
  return <AntModal {...rest} centered={centered} destroyOnHidden={destroyOnHidden} />;
}

ModalBase.displayName = 'Modal';

/** Static helpers are antd's own, so `Modal.confirm`, `Modal.useModal` … keep their typing. */
export const Modal = Object.assign(ModalBase, {
  useModal: AntModal.useModal,
  info: AntModal.info,
  success: AntModal.success,
  error: AntModal.error,
  warning: AntModal.warning,
  warn: AntModal.warn,
  confirm: AntModal.confirm,
  destroyAll: AntModal.destroyAll,
  config: AntModal.config,
});
