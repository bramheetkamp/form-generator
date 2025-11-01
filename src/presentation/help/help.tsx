import React from 'react';
import {BaseLayout} from '@/presentation/base/baseLayout';
import {Flex, Text} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';

export const HelpPage = () => {
  const router = useRouter();
  const {t} = useTranslation('common');

  return (
    <BaseLayout
      title={t('help')}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <Flex
        w={'full'}
        h={'full'}
        bg={'white'}
        borderRadius={'2'}
        flex={'1'}
        p={4}
        direction="column"
      >
        <Text variant={'title'} w={'full'} noOfLines={1} mb={4}>
          {t('help')}
        </Text>
      </Flex>
    </BaseLayout>
  );
};
