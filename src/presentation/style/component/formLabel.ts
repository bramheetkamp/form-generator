import {defineRecipe} from '@chakra-ui/react';

export const formLabelRecipe = defineRecipe({
  base: {
    fontSize: 'normal',
    fontWeight: '500',
    lineHeight: '5.5',
    color: 'gray.800',
  },
});

// Export with old name for backward compatibility
export const FormLabel = formLabelRecipe;
