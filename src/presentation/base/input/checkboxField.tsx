import {Checkbox, CheckboxProps, Text} from '@chakra-ui/react';
import {
  CheckedIcon,
  DisabledCheckedIcon,
} from '@/presentation/base/icon/checked';
import React, {memo} from 'react';

interface Props extends CheckboxProps {
  title?: string;
}

const createCheckboxField = ({
  title,
  isDisabled,
  isChecked,
  isInvalid,
  ...rest
}: Props) => {
  const icon =
    isDisabled && isChecked ? (
      <CheckboxIcon as={DisabledCheckedIcon} />
    ) : isChecked ? (
      <CheckboxIcon as={CheckedIcon} />
    ) : undefined;

  return (
    <Checkbox
      icon={icon}
      isDisabled={isDisabled}
      isChecked={isChecked}
      isInvalid={isInvalid}
      {...rest}
    >
      {title && <Text variant={isInvalid ? 'error' : undefined}>{title}</Text>}
    </Checkbox>
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
