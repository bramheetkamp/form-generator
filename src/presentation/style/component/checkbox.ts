import {defineStyleConfig} from '@chakra-ui/react';

export const Checkbox = defineStyleConfig({
  baseStyle: {
    borderColor: 'brand.500',
    borderWidth: '2px',
    control: {
      borderRadius: '0.5',
      borderColor: 'brand.500',
      boxSize: '4',
      _checked: {
        background: 'brand.500',
        borderRadius: '0.5',
        borderColor: 'brand.500',
      },
      _disabled: {
        background: 'gray.50',
        borderRadius: '0.5',
        borderColor: 'gray.300',
        _checked: {
          background: 'transparent',
        },
      },
      _invalid: {
        borderRadius: '0.5',
        borderColor: 'red.600',
      },
    },
    label: {
      ml: '3',
    },
    container: {
      px: '1',
    },
  },
  variants: {
    gray: {
      control: {
        borderColor: 'gray.500',
        borderWidth: '1px',
        boxSize: '13px',
      },
    },
    customFill: {
      control: {
        borderColor: 'var(--checkbox-custom-fill-color)',
        _checked: {
          background: 'var(--checkbox-custom-fill-color)',
          borderColor: 'var(--checkbox-custom-fill-color)',
          _hover: {
            borderColor: 'var(--checkbox-custom-fill-hover-color)',
            background: 'var(--checkbox-custom-fill-hover-color)',
          },
        },
        _hover: {
          background: 'var(--checkbox-custom-fill-color)',
          borderColor: 'var(--checkbox-custom-fill-color)',
        },
      },
      icon: {
        animation: 'none',
      },
    },
  },
});
