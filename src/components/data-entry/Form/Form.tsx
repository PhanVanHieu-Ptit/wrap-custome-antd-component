import { Form as AntForm } from 'antd';
import type { ForwardRefExoticComponent, ReactElement, Ref, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { AnyValue } from '../../_shared/antd-generics';
import type { FormProps, FormRef } from './Form.types';

// antd's `Form` is declared generic; widen to a plain component so `props`/`ref` spread cleanly.
const UntypedAntForm = AntForm as unknown as ForwardRefExoticComponent<
  FormProps & RefAttributes<FormRef>
>;

// Library defaults; every one can still be overridden per form.
const FormBase = forwardRef<FormRef, FormProps>(function Form(
  { layout = 'vertical', scrollToFirstError = true, ...rest },
  ref,
) {
  return (
    <UntypedAntForm {...rest} layout={layout} scrollToFirstError={scrollToFirstError} ref={ref} />
  );
});

FormBase.displayName = 'Form';

/** Re-typed so `Form<Values>` stays generic through `forwardRef`. */
const GenericForm = FormBase as unknown as (<Values = AnyValue>(
  props: FormProps<Values> & { ref?: Ref<FormRef<Values>> },
) => ReactElement) & { displayName?: string };

/** Compound parts & hooks are antd's own, so `Form.Item`, `Form.useForm` … keep their typing. */
export const Form = Object.assign(GenericForm, {
  Item: AntForm.Item,
  List: AntForm.List,
  ErrorList: AntForm.ErrorList,
  Provider: AntForm.Provider,
  useForm: AntForm.useForm,
  useFormInstance: AntForm.useFormInstance,
  useWatch: AntForm.useWatch,
});
