import {
  Field,
  Stack,
  StackProps,
  useRadioGroup,
} from '@chakra-ui/react';
import React, {memo} from 'react';
import {RadioItem} from '@/presentation/base/input/radioItem';
import {LabelValue} from '@/presentation/base/input/labelValue';

interface Props<T> {
  items?: LabelValue<T>[];
  value?: T;
  onItemSelected?: (item: LabelValue<T>) => void;
  errorText?: string;
  isDisabled?: boolean;
  stackProps?: StackProps;
}

export const RadioField = memo(createRadioField);

function createRadioField<T>({
  value,
  items,
  onItemSelected,
  errorText,
  isDisabled,
  stackProps,
}: Props<T>) {
  const index = items?.findIndex(item => item.value === value);

  const {getRootProps, getRadioProps} = useRadioGroup({
    value: `${index}`,
    onChange(index: string) {
      if (items === undefined) {
        return;
      }
      const item = items[Number(index)];
      onItemSelected?.(item);
    },
  });

  const group = getRootProps();

  return (
    <Field.Root invalid={!!errorText}>
      <Stack
        {...group}
        spacing={'6'}
        h={'8'}
        borderRadius={'1'}
        border={
          errorText ? '1px solid var(--chakra-colors-red-500)' : undefined
        }
        direction={'row'}
        {...stackProps}
      >
        {items?.map((item, index) => {
          const radio = getRadioProps({
            name: item.value,
            value: `${index}`,
          });
          return (
            <RadioItem
              key={index}
              isDisabled={isDisabled}
              value={radio.value}
              isChecked={radio.isChecked}
              onChange={radio.onChange}
              color={errorText ? 'red.700' : 'brand.500'}
            >
              {item.label}
            </RadioItem>
          );
        })}
      </Stack>
      <Field.ErrorText
        px={'2'}
        mt={'1'}
        w={'full'}
        color={'red.700'}
        fontSize={'sm'}
        lineHeight={'5'}
        letterSpacing={'0.01em'}
      >
        {errorText}
      </Field.ErrorText>
    </Field.Root>
  );
}
