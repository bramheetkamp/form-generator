import React, { useState } from 'react';
import { BaseLayout } from '@/presentation/base/baseLayout';
import {
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  Input,
  Text,
  Box,
  Divider,
  Textarea,
  Stack,
  Radio,
  RadioGroup,
  Button,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';

import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/domain/store/hooks';
import { setIntakeOVACData } from '@/domain/store/slices/formData';
import { OVAC_OMSCHRIJVING_ITEMS } from '@/presentation/form/constants/formConstants';

export const FormIntakeOVACPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const dispatch = useAppDispatch();

  // State voor medische indicatie
  const [medischeIndicatie, setMedischeIndicatie] = useState('');

  // State voor omschrijving items met L/R
  const [omschrijvingItems, setOmschrijvingItems] = useState<
    Record<string, { links: boolean; rechts: boolean }>
  >(
    OVAC_OMSCHRIJVING_ITEMS.reduce(
      (acc, item) => ({
        ...acc,
        [item.key]: { links: false, rechts: false },
      }),
      {}
    )
  );

  // State voor verkorting
  const [verkortingLinks, setVerkortingLinks] = useState(false);
  const [verkortingRechts, setVerkortingRechts] = useState(false);

  // State voor voorvoet en hiel
  const [voorvoetCm, setVoorvoetCm] = useState('');
  const [hielCm, setHielCm] = useState('');

  // State voor bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  const toggleOmschrijvingItem = (
    key: string,
    side: 'links' | 'rechts'
  ) => {
    setOmschrijvingItems(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [side]: !prev[key][side],
      },
    }));
  };

  const handleSubmit = () => {
    dispatch(
      setIntakeOVACData({
        medischeIndicatie,
        omschrijvingItems,
        verkortingLinks,
        verkortingRechts,
        voorvoetCm,
        hielCm,
        bijzonderheden,
      })
    );

    console.log('Intake OVAC data opgeslagen in Redux store');
  };

  return (
    <BaseLayout
      title={t('intakeOvac')}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <Flex
        w="full"
        direction="column"
        bg="white"
        p={{ base: 4, md: 6 }}
        borderRadius="md"
        gap={{ base: 4, md: 6 }}
      >
        {/* Medische Indicatie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            {t('medischeIndicatie')}
          </Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Textarea
              placeholder={t('medischeIndicatiePlaceholder')}
              value={medischeIndicatie}
              onChange={e => setMedischeIndicatie(e.target.value)}
              minH={{ base: '80px', md: '100px' }}
            />
          </Flex>
        </Box>

        <Divider />

        {/* Omschrijving Tabel */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Omschrijving
          </Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Box overflowX="auto">
              <Table size="sm" variant="simple">
                <Thead>
                  <Tr>
                    <Th>Omschrijving</Th>
                    <Th textAlign="center">Post nr</Th>
                    <Th textAlign="center">R</Th>
                    <Th textAlign="center">L</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {OVAC_OMSCHRIJVING_ITEMS.map(item => (
                    <Tr key={item.key}>
                      <Td>{item.label}</Td>
                      <Td textAlign="center">{item.postNr}</Td>
                      <Td textAlign="center">
                        <Checkbox
                          isChecked={omschrijvingItems[item.key]?.rechts || false}
                          onChange={() => toggleOmschrijvingItem(item.key, 'rechts')}
                          size="sm"
                        />
                      </Td>
                      <Td textAlign="center">
                        <Checkbox
                          isChecked={omschrijvingItems[item.key]?.links || false}
                          onChange={() => toggleOmschrijvingItem(item.key, 'links')}
                          size="sm"
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </Box>

        <Divider />

        {/* Verkorting */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{ base: 'md', md: 'lg' }}>
            Verkorting
          </Text>
          <Flex
            gap={{ base: 4, md: 6 }}
            direction={{ base: 'column', md: 'row' }}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
            align="center"
          >
            <Stack direction="row" spacing={6}>
              <Checkbox
                isChecked={verkortingRechts}
                onChange={e => setVerkortingRechts(e.target.checked)}
              >
                R
              </Checkbox>
              <Checkbox
                isChecked={verkortingLinks}
                onChange={e => setVerkortingLinks(e.target.checked)}
              >
                L
              </Checkbox>
            </Stack>
            <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} flex={1}>
              <FormControl>
                <FormLabel fontSize="sm">Voorvoet (cm)</FormLabel>
                <Input
                  type="number"
                  placeholder="0"
                  value={voorvoetCm}
                  onChange={e => setVoorvoetCm(e.target.value)}
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">Hiel (cm)</FormLabel>
                <Input
                  type="number"
                  placeholder="0"
                  value={hielCm}
                  onChange={e => setHielCm(e.target.value)}
                  size="sm"
                />
              </FormControl>
            </SimpleGrid>
          </Flex>
        </Box>

        <Divider />

        {/* Bijzonderheden */}
        <Box>
          <Text fontWeight="bold" mb={4} fontSize={{ base: 'md', md: 'lg' }}>
            {t('bijzonderheden')}
          </Text>
          <Textarea
            placeholder={t('bijzonderhedenPlaceholder')}
            value={bijzonderheden}
            onChange={e => setBijzonderheden(e.target.value)}
            minH={{ base: '100px', md: '120px' }}
          />
        </Box>

        {/* Submit button */}
        <Flex justifyContent={{ base: 'stretch', sm: 'flex-end' }} mt={4}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            w={{ base: 'full', sm: 'auto' }}
          >
            Opslaan en doorgaan
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default FormIntakeOVACPage;
