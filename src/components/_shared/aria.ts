/** Reads `aria-describedby` from props whose antd typing doesn't declare it (Select, DatePicker, …). */
export function getAriaDescribedBy(props: object): string | undefined {
  const value = (props as { 'aria-describedby'?: unknown })['aria-describedby'];
  return typeof value === 'string' ? value : undefined;
}
