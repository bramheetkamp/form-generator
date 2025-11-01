export interface LabelValue<T> {
  label: string | undefined;
  value: T;
  isDisabled?: boolean;
  checkboxColor?: string;
  checkboxHoverColor?: string;
}
