import {BoxProps, Grid, GridItem} from '@chakra-ui/react';
import React, {memo} from 'react';

interface Props extends BoxProps {
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
  leftWeight?: number;
  rightWeight?: number;
}

export const TwoColumnField = memo(
  ({
    leftComponent,
    rightComponent,
    leftWeight = 1,
    rightWeight = 3,
    ...rest
  }: Props) => {
    const totalWeight = leftWeight + rightWeight;
    return (
      <Grid
        templateColumns={`repeat(${totalWeight}, 1fr)`}
        gap={'2'}
        mt={'2'}
        alignItems={'start'}
        {...rest}
      >
        <GridItem colSpan={leftWeight} mt={'1'}>
          {leftComponent}
        </GridItem>
        <GridItem colSpan={rightWeight}>{rightComponent}</GridItem>
      </Grid>
    );
  }
);
