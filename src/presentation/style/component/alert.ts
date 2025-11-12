import {defineRecipe} from '@chakra-ui/react';

export const alertRecipe = defineRecipe({
  variants: {
    variant: {
      error: {bg: 'red.100'},
    },
  },
});

// Export with old name for backward compatibility
export const Alert = alertRecipe;
