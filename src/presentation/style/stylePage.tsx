import {Button, HStack, Text, VStack} from '@chakra-ui/react';
import {LogoIcon} from '@/presentation/base/icon/logo';
import {BackArrowIcon} from '@/presentation/base/icon/backArrow';
import {TextField} from '@/presentation/base/input/textField';
import {QuestionIcon} from '@/presentation/base/icon/question';
import {CheckboxField} from '@/presentation/base/input/checkboxField';

export const StylePage = () => {
  return (
    <VStack w={'full'} p={'10'} align={'start'} spacing={'4'}>
      <LogoIcon color={'brand.500'} />
      <Text variant={'xxl'}>Zorg op afstand</Text>
      <Text variant={'xl'}>Zorg op afstand</Text>
      <Text variant={'lg'}>Zorg op afstand</Text>
      <Text>Zorg op afstand</Text>
      <Text variant={'sm'}>Zorg op afstand</Text>
      <Text variant={'xs'}>Zorg op afstand</Text>

      <HStack>
        <Button variant={'primary'}>Primary</Button>
        <Button variant={'primary'} isDisabled>
          Primary disabled
        </Button>

        <Button variant={'secondary'}>Secondary</Button>
        <Button variant={'secondary'} isDisabled>
          Secondary disabled
        </Button>

        <Button variant={'tertiary'}>Tertiary</Button>
        <Button variant={'tertiary'} isDisabled>
          Tertiary disabled
        </Button>
      </HStack>

      <HStack>
        <Button variant={'errorPrimary'}>errorPrimary</Button>
        <Button variant={'errorSecondary'}>errorSecondary</Button>
        <Button variant={'errorTertiary'}>errorTertiary</Button>
      </HStack>

      <HStack>
        <Button variant={'primary'} p={'2'} boxSize={'iconButton.md'}>
          <BackArrowIcon boxSize={'icon.md'} />
        </Button>
        <Button variant={'primary'} p={'2'} boxSize={'iconButton.sm'}>
          <BackArrowIcon boxSize={'icon.sm'} />
        </Button>
        <Button variant={'secondary'} p={'2'} boxSize={'iconButton.md'}>
          <BackArrowIcon boxSize={'icon.md'} />
        </Button>
        <Button variant={'secondary'} p={'2'} boxSize={'iconButton.sm'}>
          <BackArrowIcon boxSize={'icon.sm'} />
        </Button>
        <Button variant={'tertiary'} p={'2'} boxSize={'iconButton.md'}>
          <BackArrowIcon boxSize={'icon.md'} />
        </Button>
        <Button variant={'tertiary'} p={'2'} boxSize={'iconButton.sm'}>
          <BackArrowIcon boxSize={'icon.sm'} />
        </Button>
      </HStack>

      <HStack>
        <Button variant={'errorPrimary'} p={'2'} boxSize={'iconButton.md'}>
          <BackArrowIcon boxSize={'icon.md'} />
        </Button>
        <Button variant={'errorPrimary'} p={'2'} boxSize={'iconButton.sm'}>
          <BackArrowIcon boxSize={'icon.sm'} />
        </Button>
        <Button variant={'errorSecondary'} p={'2'} boxSize={'iconButton.md'}>
          <BackArrowIcon boxSize={'icon.md'} />
        </Button>
        <Button variant={'errorSecondary'} p={'2'} boxSize={'iconButton.sm'}>
          <BackArrowIcon boxSize={'icon.sm'} />
        </Button>
        <Button variant={'errorTertiary'} p={'2'} boxSize={'iconButton.md'}>
          <BackArrowIcon boxSize={'icon.md'} />
        </Button>
        <Button variant={'errorTertiary'} p={'2'} boxSize={'iconButton.sm'}>
          <BackArrowIcon boxSize={'icon.sm'} />
        </Button>
      </HStack>

      <TextField label={'Label'} placeholder={'Placeholder'} />
      <TextField label={'Label'} placeholder={'Placeholder'} isDisabled />
      <TextField label={'Label'} placeholder={'Placeholder'} isOptional />
      <TextField
        label={'Label'}
        placeholder={'Placeholder'}
        infoIcon={<QuestionIcon boxSize={'5'} />}
      />
      <TextField label={'Label'} placeholder={'Placeholder'} hint={'hint'} />
      <TextField
        label={'Label'}
        placeholder={'Placeholder'}
        errorText={'This is error text'}
      />

      <CheckboxField />
      <CheckboxField title={'Text'} />
      <CheckboxField title={'Text'} isChecked />
      <CheckboxField title={'Text'} isDisabled />
      <CheckboxField title={'Text'} isChecked isDisabled />
      <CheckboxField title={'Text'} isInvalid />
    </VStack>
  );
};
