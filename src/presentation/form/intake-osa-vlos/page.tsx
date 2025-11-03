import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
import {
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Grid,
  GridItem,
  Text,
  Radio,
  RadioGroup,
  Stack,
  Input,
  Box,
  Divider,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';

interface BasiscodeProps {
  code: string;
  label: string;
}

interface LRCheckboxProps {
  label: string;
  hasLateraalMediaal?: boolean;
  hasCmField?: boolean;
}

const BasiscodeCheckbox: React.FC<BasiscodeProps> = ({ code, label }) => (
  <Flex gap={2} alignItems="center">
    <Text minW="8">{code}</Text>
    <Text flex={1}>{label}</Text>
    <Checkbox />
  </Flex>
);

const LRCheckbox: React.FC<LRCheckboxProps> = ({ label, hasLateraalMediaal, hasCmField }) => (
  <FormControl>
    <Flex gap={4} alignItems="center">
      <Text flex="1">{label}</Text>
      <Checkbox>L</Checkbox>
      <Checkbox>R</Checkbox>
      {hasLateraalMediaal && (
        <>
          <Text ml={4}>Lateraal / Mediaal</Text>
        </>
      )}
      {hasCmField && (
        <Input placeholder="...cm" size="sm" width="100px" ml={4} />
      )}
    </Flex>
  </FormControl>
);

export const FormIntakeOSAVLOSPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');

  const [paarType, setPaarType] = useState<string>('');

  return (
    <BaseLayout
      title={t('intakeOsavlos')}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <Flex
        w="full"
        direction="column"
        bg="white"
        p={6}
        borderRadius="md"
        gap={6}
      >
        {/* Basiscodes */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('basiscodes')}</Text>
          <Grid templateColumns="repeat(4, 1fr)" gap={4}>
            {['01', '02', '03', '04', '05', '06', '07', '08'].map(code => (
              <GridItem key={code}>
                <Checkbox>{code}</Checkbox>
              </GridItem>
            ))}
          </Grid>
        </Box>

        <Divider />

        {/* Omschrijving */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('omschrijving')}</Text>
          <Stack spacing={3}>
            <BasiscodeCheckbox code="09" label={t('proefschoen')} />
            <BasiscodeCheckbox code="10" label={t('verhoging13')} />
            <BasiscodeCheckbox code="11" label={t('verhoging3plus')} />
            <BasiscodeCheckbox code="14" label={t('aanvullingLengteBreedte')} />
            <BasiscodeCheckbox code="15" label={t('zoolverstijving')} />
            <BasiscodeCheckbox code="16" label={t('medLateraalZoolspoor')} />
            <BasiscodeCheckbox code="16a" label={t('kokerAanSpup')} />
            <BasiscodeCheckbox code="17" label={t('kokerTussenVoering')} />
            <BasiscodeCheckbox code="21" label={t('correctieUren')} />
            <BasiscodeCheckbox code="22" label={t('overigen')} />
          </Stack>
        </Box>

        <Divider />

        {/* Indien OSA */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('indienOsa')}</Text>
          <RadioGroup onChange={setPaarType} value={paarType}>
            <Stack direction="column" spacing={2}>
              <Radio value="eerste">{t('eerstePaar')}</Radio>
              <Radio value="herhalingspaar">{t('herhalingsPaar')}</Radio>
              <Radio value="reservepaar">{t('reservePaar')}</Radio>
              <Radio value="privepaar">{t('privéPaar')}</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <Divider />

        {/* Supplementen */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('supplementen')}</Text>
          <Stack spacing={3}>
            <LRCheckbox label={t('keerwand')} hasLateraalMediaal />
            <LRCheckbox label={t('verkorting')} hasCmField />
            <LRCheckbox label={t('schoring')} hasLateraalMediaal />
          </Stack>
        </Box>

        {/* Voeringschoen */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('voeringschoen')}</Text>
          <Stack spacing={3}>
            <LRCheckbox label={t('hoogteOmsluiting')} hasCmField />
            <LRCheckbox label={t('laveroOmsluiting')} />
            <LRCheckbox label={t('multivormOmsluiting')} />
            <LRCheckbox label={t('plastazote3mm')} />
            <LRCheckbox label={t('orcaOmsluiting')} />
            <LRCheckbox label={t('schoren')} hasLateraalMediaal />
            <LRCheckbox label={t('neusverlenging')} hasCmField />
            <LRCheckbox label={t('ercoflexveer')} />
            <LRCheckbox label={t('zoolverstijfing')} />
          </Stack>
        </Box>

        {/* Afwikkeling */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('afwikkeling')}</Text>
          <Stack spacing={4}>
            <Flex gap={4}>
              <RadioGroup defaultValue="goed">
                <Stack direction="row" spacing={4}>
                  <Radio value="goed">{t('goed')}</Radio>
                  <Radio value="aanpassen">{t('aanpassen')}</Radio>
                </Stack>
              </RadioGroup>
            </Flex>
            <FormControl>
              <Flex gap={4} alignItems="center">
                <Text>{t('meerMinderTeensprong')}</Text>
                <Input placeholder="mm" size="sm" width="100px" />
                <Text ml={4}>{t('mediaalMeerMinderSteun')}</Text>
                <Input placeholder="mm" size="sm" width="100px" />
              </Flex>
            </FormControl>
            <FormControl>
              <Flex gap={4} alignItems="center">
                <Text>{t('vervroegen')}</Text>
                <Input placeholder="mm" size="sm" width="100px" />
                <Text ml={4}>{t('voorvoetsteunMeerMinder')}</Text>
                <Input placeholder="mm" size="sm" width="100px" />
              </Flex>
            </FormControl>
            <FormControl>
              <Flex gap={4} alignItems="center">
                <Text>{t('vertragen')}</Text>
                <Input placeholder="mm" size="sm" width="100px" />
              </Flex>
            </FormControl>
          </Stack>
        </Box>

        {/* Stand */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('stand')}</Text>
          <Stack spacing={4}>
            <Flex gap={4}>
              <RadioGroup defaultValue="goed">
                <Stack direction="row" spacing={4}>
                  <Radio value="goed">{t('goed')}</Radio>
                  <Radio value="aanpassen">{t('aanpassen')}</Radio>
                </Stack>
              </RadioGroup>
            </Flex>
            <FormControl>
              <Flex gap={4} alignItems="center">
                <Text>{t('verhogenLinksRechts')}</Text>
                <Input placeholder="mm" size="sm" width="100px" />
                <Text ml={4}>{t('spits')}</Text>
              </Flex>
            </FormControl>
            <FormControl>
              <Flex gap={4} alignItems="center">
                <Text>{t('pronerenLinksRechts')}</Text>
                <Input placeholder="mm" size="sm" width="100px" />
                <Text ml={4}>{t('rond')}</Text>
              </Flex>
            </FormControl>
            <FormControl>
              <Flex gap={4} alignItems="center">
                <Text>{t('supinerenLinksRechts')}</Text>
                <Input placeholder="mm" size="sm" width="100px" />
                <Text ml={4}>{t('carre')}</Text>
              </Flex>
            </FormControl>
          </Stack>
        </Box>

        {/* Aanpassingen na uitleesten */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('aanpassingenNaUitleesten')}</Text>
          <Stack spacing={3}>
            <FormControl>
              <Flex gap={4} alignItems="center">
                <Text flex="1">{t('supplementBekleden')}</Text>
                <RadioGroup defaultValue="plastazote">
                  <Stack direction="row" spacing={4}>
                    <Radio value="plastazote">{t('plastazote')}</Radio>
                    <Radio value="on_steam">{t('onSteam')}</Radio>
                  </Stack>
                </RadioGroup>
              </Flex>
            </FormControl>
            <LRCheckbox label={t('belpartijPolsteren')} />
            <LRCheckbox label={t('basis5Polsteren')} />
            <LRCheckbox label={t('hielenPolsteren')} />
            <LRCheckbox label={t('polsterTRuit')} />
          </Stack>
        </Box>

        {/* Bijzonderheden */}
        <Box>
          <Text fontWeight="bold" mb={4}>{t('bijzonderheden')}</Text>
          <FormControl>
            <Input
              as="textarea"
              placeholder={t('bijzonderhedenPlaceholder')}
              size="lg"
              minH="120px"
            />
          </FormControl>
        </Box>

      </Flex>
    </BaseLayout>
  );
};