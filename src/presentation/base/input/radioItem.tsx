import {Box, HStack, RadioProps, Text, useRadio} from '@chakra-ui/react';
import {
  RadioCheckedIcon,
  RadioUncheckedIcon,
} from '@/presentation/base/icon/radio';
import {memo} from 'react';

// Need to create custom radio because chakra's default radio doesn't support custom icon
export const RadioItem = memo((props: RadioProps) => {
  const {getInputProps, getRadioProps} = useRadio(props);

  const input = getInputProps();
  const radio = getRadioProps();

  return (
    <Box as={'label'}>
      <input {...input} />
      <HStack align={'center'} justify={'start'} {...radio}>
        {props.isChecked ? (
          <RadioCheckedIcon color={props.color} />
        ) : (
          <RadioUncheckedIcon color={props.color} />
        )}
        <Text>{props.children}</Text>
      </HStack>
    </Box>
  );
});
