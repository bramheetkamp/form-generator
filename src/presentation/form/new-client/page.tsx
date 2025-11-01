import React from 'react';
import {BaseLayout} from '@/presentation/base/baseLayout';
import {Flex} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';

export const FormNewClientPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');

  return (
    <BaseLayout
      title={t('new-client')}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <Flex
        w={'full'}
        h={'full'}
        bg={'white'}
        borderRadius={'2'}
        flex={'1'}
      ></Flex>
    </BaseLayout>
  );
};
