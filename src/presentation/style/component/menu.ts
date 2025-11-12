import {defineSlotRecipe} from '@chakra-ui/react';

export const menuRecipe = defineSlotRecipe({
  slots: ['trigger', 'content', 'item'],
  base: {
    // define the part you're going to style
    trigger: {
      // this will style the MenuButton component
      fontWeight: '400',
      _hover: {
        bg: 'gray.100',
      },
    },
    content: {
      // this will style the MenuList component
      py: '1',
      w: 'actionDialog.w',
      bg: 'white',
      border: '1px solid rgba(102, 112, 128, 0.2)',
      boxShadow: 'popover',
      borderRadius: '1.5',
    },
    item: {
      // this will style the MenuItem and MenuItemOption components
      _hover: {
        bg: 'gray.100',
      },
    },
  },
});

// Export with old name for backward compatibility
export const Menu = menuRecipe;
