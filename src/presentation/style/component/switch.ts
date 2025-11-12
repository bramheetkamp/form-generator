import {defineSlotRecipe} from '@chakra-ui/react';

// https://chakra-ui.com/docs/components/switch/theming

export const switchRecipe = defineSlotRecipe({
  slots: ['root', 'track', 'thumb', 'label'],
  base: {
    track: {
      bg: 'gray.500',
      _checked: {
        bg: 'green.400',
      },
    },
  },
});

// Export with old name for backward compatibility
export const Switch = switchRecipe;
