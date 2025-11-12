import {
  Flex,
  FlexProps,
  Field,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import React, {HTMLInputTypeAttribute, Ref} from 'react';
import {ErrorIcon} from '@/presentation/base/icon/error';

interface Props extends FlexProps {
  label?: string;
  isOptional?: boolean;
  // Icon shown at the right of label
  infoIcon?: JSX.Element;
  hint?: string;
  errorText?: string;
  placeholder?: string;
  value?: string;
  onTextChanged?: (text: string) => void;
  type?: HTMLInputTypeAttribute | undefined;
  pattern?: string;
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
  rightElement?: JSX.Element;
  name?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isNumeric?: boolean;
  autoFocus?: boolean;
  inputRef?: Ref<HTMLInputElement> | undefined;
  autoComplete?: string;
  isSmallVariant?: boolean;
  // TODO: Clean up props and move some input props to use this field instead
  inputProps?: InputProps;
}

const createTextField = ({
  label,
  isOptional,
  infoIcon,
  hint,
  errorText,
  placeholder,
  value,
  onTextChanged,
  type,
  pattern,
  inputMode,
  rightElement,
  id,
  name,
  isRequired,
  isDisabled,
  autoFocus,
  inputRef,
  autoComplete,
  isSmallVariant,
  isNumeric = false,
  inputProps,
  ...rest
}: Props) => {
  const getElement = () => {
    if (errorText) {
      return (
        <InputRightElement
          pt={isSmallVariant ? '0' : '1'}
          height={isSmallVariant ? '8' : '10'}
          w={'fit-content'}
          mr={isSmallVariant ? '2' : '4'}
          zIndex={'0'}
        >
          <ErrorIcon boxSize={isSmallVariant ? '4' : '5'} />
        </InputRightElement>
      );
    }
    if (rightElement) {
      return (
        <InputRightElement
          pt={'1'}
          height={isSmallVariant ? '7' : '10'}
          w={'fit-content'}
          mr={'0'}
          zIndex={'0'}
        >
          {rightElement}
        </InputRightElement>
      );
    }
    return null;
  };

  return (
    <Field.Root invalid={!!errorText}>
      <Flex direction={'column'} {...rest}>
        {label && (
          <HStack w={'full'} pb={'1'} px={'2'}>
            <FormLabel m={'0'} w={'full'} color={'gray.600'}>
              {label}
            </FormLabel>
            {isOptional && <Text variant={'hint'}>Optioneel</Text>}
            {infoIcon}
          </HStack>
        )}
        <InputGroup>
          <Input
            ref={inputRef}
            id={id}
            name={name}
            autoFocus={autoFocus}
            isDisabled={isDisabled}
            required={isRequired}
            autoComplete={autoComplete}
            type={type ?? (isNumeric ? 'number' : undefined)}
            pattern={pattern ?? (isNumeric ? '[0-9]*(.[0-9]+)?' : undefined)}
            inputMode={inputMode ?? (isNumeric ? 'decimal' : undefined)}
            onWheel={e => e.currentTarget.blur()}
            value={value}
            _invalid={{
              borderColor: 'red.500',
              _placeholder: {color: 'red.700'},
            }}
            _disabled={{
              borderColor: 'gray.200',
              bg: 'gray.50',
              textColor: 'gray.500',
            }}
            focusBorderColor={'brand.500'}
            placeholder={placeholder}
            onChange={event => {
              onTextChanged?.(event.target.value as string);
            }}
            variant={isSmallVariant ? 'small' : undefined}
            borderRadius={isSmallVariant ? '1' : '1.5'}
            {...inputProps}
          />
          {getElement()}
        </InputGroup>
        {errorText ? (
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
        ) : (
          hint && (
            <HStack>
              <FormHelperText
                px={'2'}
                mt={'1'}
                w={'full'}
                fontSize={'sm'}
                lineHeight={'5'}
                letterSpacing={'0.01em'}
                color={'gray.500'}
              >
                {hint}
              </FormHelperText>
            </HStack>
          )
        )}
      </Flex>
    </Field.Root>
  );
};

export const TextField = React.memo(createTextField);
