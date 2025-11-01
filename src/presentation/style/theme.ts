import {extendTheme} from '@chakra-ui/react';
import {Menu} from '@/presentation/style/component/menu';
import {Text} from '@/presentation/style/component/text';
import {Button} from '@/presentation/style/component/button';
import {Input} from '@/presentation/style/component/input';
import {Checkbox} from '@/presentation/style/component/checkbox';
import {FormLabel} from '@/presentation/style/component/formLabel';
import {Table} from '@/presentation/style/component/table';
import {Alert} from '@/presentation/style/component/alert';
import {colors} from '@/presentation/style/colors';
import {fontSizes} from '@/presentation/style/fontSizes';
import {radii} from '@/presentation/style/radii';
import {sizes} from '@/presentation/style/sizes';
import {shadows} from '@/presentation/style/shadows';
import {space} from '@/presentation/style/space';
import {lineHeights} from '@/presentation/style/lineHeights';
import {breakpoints} from '@/presentation/style/breakpoints';
import {Switch} from '@/presentation/style/component/switch';

export const theme = extendTheme({
  fonts: {
    heading: 'var(--font-asap)',
    body: 'var(--font-asap)',
  },
  styles: {
    global: {
      '*': {
        borderColor: 'gray.200',
      },
      ':focus-visible': {
        outline: 'none',
      },
    },
  },
  components: {
    Text,
    Button,
    Input,
    FormLabel,
    Checkbox,
    Table,
    Alert,
    Menu,
    Switch,
  },
  shadows,
  colors,
  fontSizes,
  radii,
  sizes,
  space,
  lineHeights,
  breakpoints,
});
