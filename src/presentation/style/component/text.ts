import {defineStyleConfig} from '@chakra-ui/react';

const oneLine = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};

export const Text = defineStyleConfig({
  baseStyle: {
    fontSize: 'md',
    fontWeight: '400',
    lineHeight: '5.5',
    color: 'gray.800',
  },
  variants: {
    xxl: {
      fontSize: 'xxl',
      lineHeight: '12',
      letterSpacing: '-0.02em',
    },
    xl: {
      fontSize: 'xl',
      lineHeight: '9',
    },
    lg: {
      fontSize: 'lg',
      lineHeight: '6.75',
    },
    md: {
      fontSize: 'md',
      lineHeight: '5.5',
    },
    sm: {
      fontSize: 'sm',
      lineHeight: '5',
      letterSpacing: '0.01em',
    },
    xs: {
      fontSize: 'xs',
      lineHeight: '4.5',
      letterSpacing: '0.05em',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
    hint: {
      fontSize: 'sm',
      lineHeight: '5',
      letterSpacing: '0.01em',
      color: 'gray.500',
    },
    title: {
      fontSize: 'xl',
      lineHeight: '9',
      fontWeight: '600',
    },
    subsectionTitle: {
      fontSize: 'xs',
      lineHeight: '4.5',
      letterSpacing: '0.05em',
      fontWeight: '600',
      textTransform: 'uppercase',
      color: 'gray.500',
    },
    focusedSm: {
      fontSize: 'sm',
      lineHeight: '5',
      letterSpacing: '0.01em',
      fontWeight: '600',
      color: 'gray.700',
    },
    error: {
      fontSize: 'sm',
      lineHeight: '5',
      letterSpacing: '0.01em',
      color: 'red.700',
    },
    pageTitle: {
      fontSize: 'lg',
      lineHeight: '6.75',
      fontWeight: '500',
      color: 'white',
    },
    initialName: {
      bg: 'brand.500',
      borderRadius: 'full',
      boxSize: '6',
      fontSize: 'xxs',
      textColor: 'white',
      textAlign: 'center',
      fontWeight: '600',
      pt: '0.5',
    },
    semiBold: {
      fontSize: 'md',
      lineHeight: '5.5',
      fontWeight: '500',
    },
    heavierSemiBold: {
      fontSize: 'md',
      lineHeight: '5.5',
      fontWeight: '600',
    },
    smallHeavierSemiBold: {
      fontSize: 'sm',
      lineHeight: '5.5',
      fontWeight: '600',
      color: 'gray.500',
    },
    status: {
      ...oneLine,
      textColor: 'gray.700',
      fontSize: 'lg',
      lineHeight: '6.75',
      fontWeight: '500',
    },
    statusDescription: {
      ...oneLine,
      fontSize: 'md',
      fontWeight: '500',
      lineHeight: '5.5',
      textColor: 'gray.500',
    },
    printFileDescription: {
      fontSize: 'xs',
      fontWeight: '400',
      lineHeight: '4',
      color: 'gray.800',
    },
    printLabelDescription: {
      fontSize: 'lg',
      fontWeight: '500',
      lineHeight: '5',
      color: 'gray.800',
    },
    printDescription: {
      fontSize: '3xs',
      fontWeight: '400',
      lineHeight: '4',
      color: 'gray.800',
    },
    printDescriptionMedium: {
      fontSize: '3xs',
      fontWeight: '500',
      lineHeight: '4',
      color: 'gray.800',
    },
    printTitle: {
      fontSize: '26px',
      fontWeight: '500',
      lineHeight: '5',
      color: 'gray.800',
    },
    blueLargeMedium: {
      fontSize: 'lg',
      lineHeight: '6.75',
      fontWeight: '500',
      color: 'brand.500',
    },
  },
  defaultProps: {
    variant: 'md',
  },
});
