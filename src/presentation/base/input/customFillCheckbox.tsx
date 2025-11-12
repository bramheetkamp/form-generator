import {memo} from 'react';
import {Box, Checkbox} from '@chakra-ui/react';

interface Props {
  customFill?: string;
  customFillHover?: string;
  [key: string]: any;
}

export const CustomFillCheckbox = memo(
  ({customFill, customFillHover, ...rest}: Props) => {
    const fillColor = customFill ?? 'brand.500';
    const hoverColor = customFillHover ?? customFill ?? 'brand.700';
    return (
      <Box
        css={{
          '--checkbox-custom-fill-color': fillColor,
          '--checkbox-custom-fill-hover-color': hoverColor,
        }}
      >
        <Checkbox.Root variant={'customFill'} {...rest}>
          <Checkbox.HiddenInput />
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
        </Checkbox.Root>
      </Box>
    );
  }
);
