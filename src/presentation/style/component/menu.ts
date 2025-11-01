import {defineStyleConfig} from '@chakra-ui/react';

export const Menu = defineStyleConfig({
  baseStyle: {
    // define the part you're going to style
    button: {
      // this will style the MenuButton component
      fontWeight: '400',
      _hover: {
        bg: 'gray.100',
      },
    },
    list: {
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
