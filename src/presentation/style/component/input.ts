import {defineSlotRecipe} from '@chakra-ui/react';

const textFieldStyle = {
  field: {
    py: '3',
    px: '4',
    h: 'input.minH',
    background: 'white',
    border: '1px solid var(--chakra-colors-gray-200)',
    boxShadow: 'inset 0px -2px 0px rgb(197 212 231 / 34%)',
    borderRadius: '1.5',
    _placeholder: {color: 'gray.500'},
    fontWeight: '400',
    fontSize: 'md',
    lineHeight: '5.5',
    minHeight: 'input.minH',
    transitionDuration: '0.3s',
    _disabled: {
      opacity: '1',
      border: '1px solid var(--chakra-colors-gray-100)',
      background: 'gray.50',
      textColor: 'gray.500',
      _hover: {
        border: '1px solid var(--chakra-colors-gray-100)',
      },
    },
    _focus: {
      border: '1px solid var(--chakra-colors-brand-500)',
    },
  },
};

const searchFieldStyle = {
  field: {
    ...textFieldStyle.field,
    minHeight: '11',
    height: '11',
  },
};

const smallStyle = {
  field: {
    ...textFieldStyle.field,
    h: '8',
    minH: 'unset',
    boxShadow: 'unset',
    py: '1.25',
    px: '2',
    _focus: {
      border: '1px solid var(--chakra-colors-brand-500)',
    },
  },
};

const singleDigitStyle = {
  field: {
    ...textFieldStyle.field,
    px: '3',
    py: '4',
    fontSize: 'xxl',
    lineHeight: '12',
    w: 'input.singleDigit.w',
    h: 'input.singleDigit.h',
    pl: '4',
    _focus: {
      border: '2px solid var(--chakra-colors-brand-500)',
    },
  },
};

export const inputRecipe = defineSlotRecipe({
  slots: ['field', 'addon', 'element'],
  base: {},
  variants: {
    variant: {
      textField: textFieldStyle,
      searchField: searchFieldStyle,
      singleDigit: singleDigitStyle,
      small: smallStyle,
    },
  },
  defaultVariants: {
    variant: 'textField',
  },
});

// Export with old name for backward compatibility
export const Input = inputRecipe;
