import {
  Field,
  Textarea,
  TextareaProps,
} from '@chakra-ui/react';
import React from 'react';

interface Props extends TextareaProps {
  errorText?: string;
}

export const TextareaField = ({errorText, ...rest}: Props) => {
  return (
    <Field.Root invalid={!!errorText}>
      <Textarea
        rows={7}
        p={'2'}
        borderWidth={'1px'}
        borderColor={'gray.200'}
        borderRadius={'1'}
        _invalid={{
          borderColor: 'red.500',
        }}
        _focus={{
          border: '1px solid var(--chakra-colors-brand-500)',
        }}
        {...rest}
      />
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
};
