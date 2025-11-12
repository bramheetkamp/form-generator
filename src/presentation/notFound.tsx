import {PageHeader} from '@/presentation/base/pageHeader';
import React from 'react';
import {Button, Flex, Text} from '@chakra-ui/react';
import {NotFoundIcon} from '@/presentation/base/icon/notFound';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from './routes';

export const NotFoundPage = () => {
  const router = useRouter();

  return (
    <Flex
      direction={'column'}
      w={'full'}
      minH={'100vh'}
      h={'full'}
      bg={'gray.100'}
      alignItems={'center'}
    >
      <PageHeader />
      <NotFoundIcon mt={'notFound.mt'} />
      <Text mt={'16'} variant={'xl'} fontWeight={'600'} textColor={'brand.700'}>
        {'notFound.title'}
      </Text>
      <Text mt={'2'}>{'notFound.description'}</Text>
      <Button
        variant={'primary'}
        onClick={event => {
          event.preventDefault();
          router.push(Routes.overview);
        }}
        mt={'8'}
      >
        {'backToStart'}
      </Button>
    </Flex>
  );
};
