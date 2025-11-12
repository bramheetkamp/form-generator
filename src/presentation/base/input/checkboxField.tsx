import {Checkbox, Text} from '@chakra-ui/react';
import {
  CheckedIcon,
  DisabledCheckedIcon,
} from '@/presentation/base/icon/checked';
import React, {memo} from 'react';

interface Props {
  title?: string;
  disabled?: boolean;
  checked?: boolean;
  invalid?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

const createCheckboxField = ({
  title,
  disabled,
  checked,
  invalid,
  ...rest
}: Props) => {
  const icon =
    disabled && checked ? (
      <CheckboxIcon as={DisabledCheckedIcon} />
    ) : checked ? (
      <CheckboxIcon as={CheckedIcon} />
    ) : undefined;

  return (
    <Checkbox.Root
      disabled={disabled}
      checked={checked}
      invalid={invalid}
      {...rest}
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control>
        {icon || <Checkbox.Indicator />}
      </Checkbox.Control>
      {title && (
        <Checkbox.Label>
          <Text css={invalid ? {color: 'red.700'} : undefined}>{title}</Text>
        </Checkbox.Label>
      )}
    </Checkbox.Root>
  );
};

/**
 * Fix for getting warning when using custom icon in checkbox
 * https://github.com/chakra-ui/chakra-ui/issues/7044
 */
export function CheckboxIcon({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isChecked,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isIndeterminate,
  as: Element,
  ...rest
}: {
  isChecked?: boolean;
  isIndeterminate?: boolean;
  as: React.ElementType;
}) {
  return <Element {...rest} />;
}

export const CheckboxField = memo(createCheckboxField);
