import {memo} from 'react';
import {Box, Checkbox, CheckboxProps} from '@chakra-ui/react';

interface Props {
  customFill?: string;
  customFillHover?: string;
}

export const CustomFillCheckbox = memo(
  ({customFill, customFillHover, ...rest}: Props & CheckboxProps) => {
    const fillColor = customFill ?? 'brand.500';
    const hoverColor = customFillHover ?? customFill ?? 'brand.700';
    return (
      <Box
        sx={{
          '--checkbox-custom-fill-color': fillColor,
          '--checkbox-custom-fill-hover-color': hoverColor,
        }}
      >
        <Checkbox variant={'customFill'} {...rest} />
      </Box>
    );
  }
);
