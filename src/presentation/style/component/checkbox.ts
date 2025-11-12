import {defineSlotRecipe} from '@chakra-ui/react';

export const checkboxRecipe = defineSlotRecipe({
  slots: ['root', 'control', 'label', 'indicator'],
  base: {
    root: {
      px: '1',
    },
    control: {
      borderRadius: '0.5',
      borderColor: 'brand.500',
      borderWidth: '2px',
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
  },
  variants: {
    variant: {
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
        indicator: {
          animation: 'none',
        },
      },
    },
  },
});

// Export with old name for backward compatibility
export const Checkbox = checkboxRecipe;
