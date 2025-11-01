import {switchAnatomy} from '@chakra-ui/anatomy';
import {createMultiStyleConfigHelpers} from '@chakra-ui/react';

// https://chakra-ui.com/docs/components/switch/theming

const {definePartsStyle, defineMultiStyleConfig} =
  createMultiStyleConfigHelpers(switchAnatomy.keys);

const baseStyle = definePartsStyle({
  track: {
    bg: 'gray.500',
    _checked: {
      bg: 'green.400',
    },
  },
});

export const Switch = defineMultiStyleConfig({baseStyle});
