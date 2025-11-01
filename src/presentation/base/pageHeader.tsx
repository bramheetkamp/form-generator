import React, {memo} from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import {LeftArrowIcon} from '@/presentation/base/icon/leftArrow';
import {Link} from '@/presentation/base/link';
import {Routes} from '../routes';

export interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackButtonClicked?: () => void;
}

export const PageHeader = memo(
  ({title, showBackButton, onBackButtonClicked}: PageHeaderProps) => {
    const {t} = useTranslation('common');

    return (
      <>
        <Center w={'full'} bg={'brand.700'} alignItems={'center'}>
          <Flex direction={'row'} w={'full'} p={5} alignItems={'center'}>
            <Box w={'leftPanel.w'} minW={'leftPanel.w'} pl={'6'} py={'2'}>
              <Link href={Routes.overview}>
                <Text variant={'pageTitle'} ml={'1'} noOfLines={1}>
                  Eemland
                </Text>
              </Link>
            </Box>
            {!title ? null : showBackButton ? (
              <Button
                aria-label={t('common:back')}
                ml={'2'}
                px={'2'}
                variant={'tertiaryLight'}
                _hover={{bg: 'gray.600'}}
                onClick={() => onBackButtonClicked?.()}
              >
                <HStack py={'2'}>
                  <LeftArrowIcon boxSize={'5'} color={'white'} />
                  <Text variant={'pageTitle'} ml={'1'} noOfLines={1}>
                    {title}
                  </Text>
                </HStack>
              </Button>
            ) : (
              <Text
                variant={'pageTitle'}
                ml={showBackButton ? '1' : '4'}
                noOfLines={1}
                w={'fit-content'}
              >
                {title}
              </Text>
            )}

            <Spacer />
            <Link href={Routes.help} mr={'2'}>
              {/* Cast button as div, so the focus will only be on Link parent component */}
              <Button variant={'tertiaryLight'} as={'div'}>
                <HStack py={'2'}>
                  <Text fontWeight={'500'} color={'white'}>
                    {t('help')}
                  </Text>
                </HStack>
              </Button>
            </Link>
          </Flex>
        </Center>
      </>
    );
  }
);
