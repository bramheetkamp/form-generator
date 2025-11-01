import {defineStyleConfig} from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: '2',
    paddingX: '2',
    paddingY: '3',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 'md',
    lineHeight: '5.5',
    transitionDuration: '0.3s',
    _focus: {
      border: '2px solid var(--chakra-colors-brand-500)',
    },
  },
  variants: {
    primary: {
      minW: 'unset',
      background: 'brand.500',
      textColor: 'white',
      border: '1px solid transparent',
      boxShadow: ' inset 0px -2px 0px rgba(0, 0, 0, 0.25)',
      _focus: {
        border: '1px solid',
        borderColor: 'gray.600',
      },
      _hover: {
        background: 'brand.700',
        boxShadow: 'inset 0px -2px 0px rgba(0, 0, 0, 0.25)',
        _disabled: {
          background: 'gray.400',
          boxShadow: 'unset',
        },
      },
      _disabled: {
        background: 'gray.400',
      },
    },
    secondary: {
      minW: 'unset',
      boxShadow: 'secondary',
      border: '1px solid',
      borderColor: 'gray.200',
      background: 'white',
      textColor: 'gray.600',
      _hover: {
        background: 'gray.100',
        boxShadow: 'secondary',
        _disabled: {
          background: 'gray.100',
          boxShadow: 'unset',
        },
      },
      _focus: {
        border: '1px solid',
        borderColor: 'brand.500',
      },
      _disabled: {
        background: 'gray.100',
      },
    },
    secondaryButton: {
      boxShadow: 'secondary',
      border: '1px solid',
      borderColor: 'gray.200',
      background: 'white',
      textColor: 'gray.600',
      minW: '7',
      boxSize: '7',
      p: '0',
      _hover: {
        background: 'gray.100',
        boxShadow: 'secondary',
        _disabled: {
          background: 'gray.100',
          boxShadow: 'unset',
        },
      },
      _focus: {
        border: '1px solid',
        borderColor: 'brand.500',
      },
      _disabled: {
        background: 'gray.100',
      },
    },
    tertiary: {
      minW: 'unset',
      boxShadow: 'unset',
      background: 'white',
      textColor: 'gray.600',
      border: '1px solid transparent',
      _hover: {
        background: 'gray.100',
        _disabled: {
          textColor: 'gray.400',
          boxShadow: 'unset',
        },
      },
      _disabled: {
        textColor: 'gray.400',
      },
      _focus: {
        border: '1px solid',
        borderColor: 'brand.500',
      },
    },
    tertiaryLight: {
      minW: 'unset',
      boxShadow: 'unset',
      background: 'transparent',
      textColor: 'white',
      border: '1px solid transparent',
      _hover: {
        background: 'gray.600',
        borderRadius: '1.5',
        _disabled: {
          textColor: 'gray.200',
          boxShadow: 'unset',
        },
      },
      _disabled: {
        textColor: 'gray.200',
      },
      _focus: {
        border: '1px solid',
        borderColor: 'brand.500',
      },
    },
    errorPrimary: {
      minW: 'unset',
      backgroundColor: 'red.600',
      textColor: 'white',
      boxShadow: 'inset 0px -2px 0px rgba(0, 0, 0, 0.25)',
      border: '1px solid transparent',
      _hover: {
        background: 'red.700',
        boxShadow: 'inset 0px -2px 0px rgba(0, 0, 0, 0.25)',
      },
      _focus: {
        border: '1px solid',
        borderColor: 'brand.500',
      },
    },
    errorSecondary: {
      minW: 'unset',
      boxShadow: 'secondary',
      border: '1px solid',
      borderColor: 'red.200',
      background: 'white',
      textColor: 'red.600',
      _hover: {
        background: 'red.100',
        border: '1px solid',
        borderColor: 'red.200',
        boxShadow: 'inset 0px -2px 0px var(--chakra-colors-red-200)',
      },
      _focus: {
        border: '1px solid',
        borderColor: 'brand.500',
      },
    },
    errorTertiary: {
      minW: 'unset',
      background: 'white',
      textColor: 'red.600',
      border: '1px solid transparent',
      _hover: {
        background: 'red.100',
      },
      _focus: {
        border: '1px solid',
        borderColor: 'brand.500',
      },
    },
    ghost: {
      textColor: 'gray.600',
      border: '1px solid',
      borderColor: 'transparent',
      _hover: {
        background: 'gray.100',
        _disabled: {
          background: 'gray.100',
          boxShadow: 'unset',
        },
      },
      _focus: {
        border: '1px solid',
        borderColor: 'brand.500',
      },
      _disabled: {
        background: 'gray.100',
      },
    },
    smallButton: {
      bg: 'unset',
      borderWidth: '1px',
      borderColor: 'gray.200',
      borderRadius: '1.5',
      boxSize: '7',
      minW: 'unset',
      _hover: {
        bg: 'gray.100',
      },
      _focus: {
        border: '1px solid',
        borderColor: 'brand.500',
      },
    },
    gray: {
      p: '4',
      w: 'full',
      h: 'fit-content',
      bg: 'gray.50',
      borderColor: 'gray.200',
      borderWidth: 'px',
      borderRadius: '1.5',
      _focus: {
        border: '1px solid',
        borderColor: 'brand.500',
      },
    },
  },
});
