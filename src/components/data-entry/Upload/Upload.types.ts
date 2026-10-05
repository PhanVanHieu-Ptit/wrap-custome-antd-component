import type { UploadProps as AntUploadProps, UploadRef as AntUploadRef } from 'antd';
import type { AnyValue } from '../../_shared/antd-generics';

/** Ref target of antd Upload. */
export type UploadRef<T = AnyValue> = AntUploadRef<T>;

/** File type antd passes to `beforeUpload` / `onReject`. */
export type UploadRcFile = Parameters<NonNullable<AntUploadProps['beforeUpload']>>[0];

/** Props added on top of antd's Upload. Everything here is optional. */
export interface UploadCustomProps {
  /** Largest accepted file in bytes; bigger files are dropped before upload (not added to the list). */
  maxSize?: number;
  /** Called for each file dropped by `maxSize`, e.g. to show your own message. */
  onReject?: (file: UploadRcFile, reason: 'size') => void;
}

/** antd `UploadProps` (all autocomplete/JSDoc preserved) + custom props. */
export type UploadProps<T = AnyValue> = AntUploadProps<T> & UploadCustomProps;
