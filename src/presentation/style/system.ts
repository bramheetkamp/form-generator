import {createSystem, defaultConfig, defineConfig} from '@chakra-ui/react';
import {buttonRecipe} from '@/presentation/style/component/button';
import {inputRecipe} from '@/presentation/style/component/input';
import {checkboxRecipe} from '@/presentation/style/component/checkbox';
import {textRecipe} from '@/presentation/style/component/text';
import {formLabelRecipe} from '@/presentation/style/component/formLabel';
import {alertRecipe} from '@/presentation/style/component/alert';
import {menuRecipe} from '@/presentation/style/component/menu';
import {switchRecipe} from '@/presentation/style/component/switch';
import {tableRecipe} from '@/presentation/style/component/table';
import {colors} from '@/presentation/style/colors';
import {fontSizes} from '@/presentation/style/fontSizes';
import {radii} from '@/presentation/style/radii';
import {sizes} from '@/presentation/style/sizes';
import {shadows} from '@/presentation/style/shadows';
import {space} from '@/presentation/style/space';
import {lineHeights} from '@/presentation/style/lineHeights';
import {breakpoints} from '@/presentation/style/breakpoints';

const config = defineConfig({
  theme: {
    tokens: {
      colors,
      fontSizes,
      radii,
      sizes,
      shadows,
      spacing: space,
      lineHeights,
      fonts: {
        heading: {value: 'var(--font-asap)'},
        body: {value: 'var(--font-asap)'},
      },
    },
    breakpoints,
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
      checkbox: checkboxRecipe,
      text: textRecipe,
      formLabel: formLabelRecipe,
      alert: alertRecipe,
      menu: menuRecipe,
      switch: switchRecipe,
      table: tableRecipe,
    },
  },
  globalCss: {
    '*': {
      borderColor: 'gray.200',
    },
    ':focus-visible': {
      outline: 'none',
    },
  },
});

export const system = createSystem(defaultConfig, config);
