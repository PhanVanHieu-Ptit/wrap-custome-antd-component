import type { ReactElement, ReactNode } from 'react';
import { useId } from 'react';
import { useStyles } from './Field.styles';
import type { FieldCustomProps, FieldStatus } from './Field.types';

interface UseFieldOptions extends FieldCustomProps {
  id?: string;
  required?: boolean;
  status?: FieldStatus;
  'aria-describedby'?: string;
}

interface FieldControlProps {
  id: string;
  status: FieldStatus;
  'aria-invalid': true | undefined;
  'aria-describedby': string | undefined;
}

interface UseFieldResult {
  /** Spread onto the antd control. */
  controlProps: FieldControlProps;
  /** Wraps the control with label + description. Returns it untouched when neither is needed. */
  renderField: (control: ReactElement) => ReactNode;
}

/**
 * Shared label / helper / error behaviour for form controls (Input, Select, InputNumber, …).
 * No extra DOM unless a custom prop needs it, so layout and refs match antd's control.
 */
export function useField({
  id,
  label,
  helperText,
  errorMessage,
  required,
  status,
  'aria-describedby': ariaDescribedBy,
}: UseFieldOptions): UseFieldResult {
  const { styles } = useStyles();
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const describedById = `${fieldId}-description`;

  const hasError = Boolean(errorMessage);
  const description = hasError ? errorMessage : helperText;

  const controlProps: FieldControlProps = {
    id: fieldId,
    status: hasError ? 'error' : status,
    'aria-invalid': hasError || undefined,
    'aria-describedby': description ? describedById : ariaDescribedBy,
  };

  const renderField = (control: ReactElement) => {
    if (!label && !description) return control;

    return (
      <div className={styles.field}>
        {label && (
          <label htmlFor={fieldId} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}
        {control}
        {description && (
          <div id={describedById} className={hasError ? styles.error : styles.helper}>
            {description}
          </div>
        )}
      </div>
    );
  };

  return { controlProps, renderField };
}
