import {colors} from '@/presentation/style/colors';
import {defineStyleConfig} from '@chakra-ui/react';

const tableBorder = `1px solid ${colors.gray[200]}`;
const tableBorderDashed = `1px dashed ${colors.gray[200]}`;

export const Table = defineStyleConfig({
  baseStyle: {},
  variants: {
    simple: {
      th: {
        bg: 'transparent',
        textTransform: 'inherit',
        textColor: 'gray.800',
        fontWeight: '600',
        fontSize: 'xs',
        fontFamily: 'inherit',
        letterSpacing: 'unset',
        px: '0',
        pb: '1',
        pt: '3',
      },
      td: {
        color: 'gray.800',
        border: 'unset',
        fontSize: 'sm',
        px: '0',
        py: '3',
      },
    },
    grayHeader: {
      th: {
        bgColor: 'gray.100',
        textTransform: 'inherit',
        textColor: 'gray.800',
        fontWeight: '500',
        fontSize: 'md',
        fontFamily: 'inherit',
        letterSpacing: 'unset',
        '&:nth-of-type(odd)': {px: '4', py: '11px'},
        '&:nth-of-type(even)': {px: '4', py: '11px'},
      },
      td: {
        '&:nth-of-type(odd)': {px: '4', py: '2', color: 'gray.600'},
        '&:nth-of-type(even)': {px: '4', py: '2', color: 'gray.600'},
      },
      tr: {
        transitionDuration: '0.3s',
        _hover: {bg: 'gray.100', cursor: 'pointer'},
      },
    },
    calendar: {
      table: {
        borderSpacing: '0',
        borderCollapse: 'separate',
        borderRadius: '10px',
        border: tableBorder,
        overflow: 'hidden',
      },
      th: {
        bgColor: 'gray.100',
        letterSpacing: 'unset',
        py: '0',
        /* Apply a border to the right of all but the last column */
        '&:not(:last-child)': {borderRight: tableBorder},
        /* Apply a border to the bottom of all header rows */
        borderBottom: tableBorder,
      },
      td: {
        h: '10',
        minW: '18',
        transitionDuration: '0.3s',
        _hover: {bg: 'gray.100'},
        '&:nth-of-type(odd)': {px: '4', py: '2', color: 'gray.600'},
        '&:nth-of-type(even)': {px: '4', py: '2', color: 'gray.600'},
        /* Apply a border to the right of all but the last column */
        '&:not(:last-child)': {borderRight: tableBorder},
      },
      tr: {
        transitionDuration: '0.3s',
        _hover: {bg: 'gray.50'},
        /* Apply a border to the bottom of all but the last row */
        '&:nth-of-type(odd)&:not(:last-child)>td': {
          borderBottom: tableBorderDashed,
        },
        '&:nth-of-type(even)&:not(:last-child)>td': {borderBottom: tableBorder},
        '&:not(:last-child)>th': {borderBottom: tableBorder},
      },
    },
    print: {
      th: {
        bg: 'transparent',
        textTransform: 'inherit',
        textColor: 'gray.800',
        fontWeight: '600',
        fontSize: '3xs',
        fontFamily: 'inherit',
        letterSpacing: 'unset',
        px: '0',
        py: '2',
      },
      td: {
        color: 'gray.800',
        border: 'unset',
        fontSize: '3xs',
        px: '0',
        pt: '1',
        pb: '0',
      },
    },
  },
});
