import {BoxProps, Text} from '@chakra-ui/react';
import React, {memo} from 'react';
import {TwoColumnField} from '@/presentation/base/twoColumnField';

interface Props extends BoxProps {
  leftText: string;
  rightText: string;
  variant?: string;
}

export const TwoColumnTexts = memo(
  ({leftText, rightText, variant, ...rest}: Props) => {
    return (
      <TwoColumnField
        leftComponent={<Text variant={variant || 'semiBold'}>{leftText}</Text>}
        rightComponent={
          <Text mt={'1'} variant={variant || 'md'}>
            {rightText}
          </Text>
        }
        {...rest}
      />
    );
  }
);
