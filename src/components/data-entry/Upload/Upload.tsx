import { Upload as AntUpload } from 'antd';
import type { PropsWithChildren, ReactElement, Ref } from 'react';
import { forwardRef } from 'react';
import type { AnyValue } from '../../_shared/antd-generics';
import type { UploadProps, UploadRcFile, UploadRef } from './Upload.types';

const UploadBase = forwardRef<UploadRef, PropsWithChildren<UploadProps>>(function Upload(
  { maxSize, onReject, beforeUpload, ...rest },
  ref,
) {
  // Only intercept when asked, so antd's behaviour is untouched by default.
  const guarded =
    maxSize === undefined
      ? beforeUpload
      : (file: UploadRcFile, fileList: UploadRcFile[]) => {
          if (file.size > maxSize) {
            onReject?.(file, 'size');
            return AntUpload.LIST_IGNORE;
          }
          return beforeUpload?.(file, fileList);
        };

  return <AntUpload {...rest} beforeUpload={guarded} ref={ref} />;
});

UploadBase.displayName = 'Upload';

/** Re-typed so `Upload<T>` stays generic through `forwardRef`. */
const GenericUpload = UploadBase as unknown as (<T = AnyValue>(
  props: PropsWithChildren<UploadProps<T>> & { ref?: Ref<UploadRef<T>> },
) => ReactElement) & { displayName?: string };

/** `Dragger` and `LIST_IGNORE` are antd's own. */
export const Upload = Object.assign(GenericUpload, {
  Dragger: AntUpload.Dragger,
  LIST_IGNORE: AntUpload.LIST_IGNORE,
});
