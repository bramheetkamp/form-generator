import React, {useState} from 'react';
import {BaseLayout} from '@/presentation/base/baseLayout';
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
  Button,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import {DatePickerField} from '@/presentation/base/input/datePickerField';

import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {useAppDispatch} from '@/domain/store/hooks';
import {setIntakeOSBData} from '@/domain/store/slices/formData';
import {
  PAARTYPE_OPTIONS,
  DOEL_OPTIONS,
  LOOPFUNCTIE_OPTIONS,
  LEVERANCIER_OPTIONS,
  BASISCODE_OPTIONS,
  SUPPLEMENT_OPTIONS,
  HALLUX_MM_OPTIONS,
  VERDIEPING_MM_OPTIONS,
  STEUNZOOL_TYPES,
  CORRECTIE_MIDDENVOET,
  CORRECTIE_VOORVOET,
  PELLOTE_OPTIONS,
} from '@/presentation/form/constants/formConstants';

export const FormIntakeOSBPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();

  // Sectie 1: Header & Omschrijving
  const [ordernummer, setOrdernummer] = useState('');
  const [omschrijving, setOmschrijving] = useState<string>('');

  // Sectie 2: Medische Indicatie
  const [medischeIndicatie, setMedischeIndicatie] = useState('');

  // Sectie 3: Doel (checkboxes zonder L/R)
  const [doel, setDoel] = useState<string[]>([]);

  // Sectie 4: Loopfunctie
  const [loopfunctie, setLoopfunctie] = useState<string[]>([]);

  // Sectie 5: Leverancier & Bestel Datum
  const [leverancier, setLeverancier] = useState<string>('');
  const [bestelDatum, setBestelDatum] = useState<Date | undefined>(undefined);

  // Sectie 6: Product Specificaties
  const [artCode, setArtCode] = useState('');
  const [lengteMaat, setLengteMaat] = useState('');
  const [wijdte, setWijdte] = useState('');
  const [kleur, setKleur] = useState('');
  const [sluiting, setSluiting] = useState('');

  // Sectie 7: Modules - Hallux valgus
  const [halluxValgusLinks, setHalluxValgusLinks] = useState(false);
  const [halluxValgusRechts, setHalluxValgusRechts] = useState(false);
  const [halluxValgusLinksMm, setHalluxValgusLinksMm] = useState('');
  const [halluxValgusRechtsMm, setHalluxValgusRechtsMm] = useState('');

  // Sectie 7: Modules - Verdiepingen voorvoet
  const [verdiepingenVoorvoetLinks, setVerdiepingenVoorvoetLinks] =
    useState(false);
  const [verdiepingenVoorvoetRechts, setVerdiepingenVoorvoetRechts] =
    useState(false);
  const [verdiepingenVoorvoetLinksMm, setVerdiepingenVoorvoetLinksMm] =
    useState('');
  const [verdiepingenVoorvoetRechtsMm, setVerdiepingenVoorvoetRechtsMm] =
    useState('');

  // Sectie 8: Basiscode SOS & Omschrijving
  const [basiscodeSOS, setBasiscodeSOS] = useState<string>('');
  const [supplements, setSupplements] = useState<
    Record<string, {links: boolean; rechts: boolean; code: number}>
  >({});

  // Sectie 9: Steunzolen (gecombineerd voor beide voeten)
  const [steunzoolType, setSteunzoolType] = useState<string[]>([]);
  const [steunzoolTypeAnders, setSteunzoolTypeAnders] = useState('');
  const [steunzoolCorrectieMiddenvoet, setSteunzoolCorrectieMiddenvoet] =
    useState('');
  const [steunzoolCorrectieVoorvoet, setSteunzoolCorrectieVoorvoet] =
    useState('');
  const [steunzoolVvPellote, setSteunzoolVvPellote] = useState('');
  const [steunzoolHakVerhogingLinks, setSteunzoolHakVerhogingLinks] =
    useState('');
  const [steunzoolHakVerhogingRechts, setSteunzoolHakVerhogingRechts] =
    useState('');

  // Bijzonderheden
  const [bijzonderheden, setBijzonderheden] = useState('');

  // Helper functions
  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item);
    }
    return [...array, item];
  };

  const toggleSupplement = (key: string, side: 'links' | 'rechts') => {
    const supplement = SUPPLEMENT_OPTIONS.find(s => s.key === key);
    if (!supplement) {
      return;
    }

    setSupplements(prev => {
      const current = prev[key] || {
        links: false,
        rechts: false,
        code: supplement.code,
      };
      return {
        ...prev,
        [key]: {
          ...current,
          [side]: !current[side],
        },
      };
    });
  };

  const handleSubmit = () => {
    dispatch(
      setIntakeOSBData({
        ordernummer,
        omschrijving,
        medischeIndicatie,
        doel,
        loopfunctie,
        leverancier,
        bestelDatum: bestelDatum?.toISOString() || '',
        productSpecificaties: {
          artCode,
          lengteMaat,
          wijdte,
          kleur,
          sluiting,
        },
        halluxValgusLinks,
        halluxValgusRechts,
        halluxValgusLinksMm,
        halluxValgusRechtsMm,
        verdiepingenVoorvoetLinks,
        verdiepingenVoorvoetRechts,
        verdiepingenVoorvoetLinksMm,
        verdiepingenVoorvoetRechtsMm,
        basiscodeSOS,
        supplements,
        steunzool: {
          type: steunzoolType,
          typeAnders: steunzoolTypeAnders,
          correctieMiddenvoet: steunzoolCorrectieMiddenvoet,
          correctieVoorvoet: steunzoolCorrectieVoorvoet,
          vvPellote: steunzoolVvPellote,
          hakVerhogingLinks: steunzoolHakVerhogingLinks,
          hakVerhogingRechts: steunzoolHakVerhogingRechts,
        },
        bijzonderheden,
      })
    );

    console.log('Intake OSB data opgeslagen in Redux store');
  };

  return (
    <BaseLayout
      title={t('intakeOsb')}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <Flex
        w="full"
        direction="column"
        bg="white"
        p={{base: 4, md: 6}}
        borderRadius="md"
        gap={{base: 4, md: 6}}
      >
        {/* Sectie 1: Header & Omschrijving */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('omschrijving')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Box flex={1}>
              <RadioGroup value={omschrijving} onChange={setOmschrijving}>
                <Stack spacing={3}>
                  {PAARTYPE_OPTIONS.map(option => (
                    <Radio key={option} value={option}>
                      {t(option.toLowerCase().replace(/ /g, ''))}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
            <FormControl flex={1} maxW={{base: 'full', md: '300px'}}>
              <FormLabel fontSize="sm">{t('ordernummer')}</FormLabel>
              <Input
                placeholder={t('ordernummerPlaceholder')}
                value={ordernummer}
                onChange={e => setOrdernummer(e.target.value)}
                size="sm"
              />
            </FormControl>
          </Flex>
        </Box>

        <Divider />

        {/* Sectie 2: Medische Indicatie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('medischeIndicatie')}
          </Text>
          <Box
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
              minH={{base: '80px', md: '100px'}}
            />
          </Box>
        </Box>

        <Divider />

        {/* Sectie 3: Doel */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('doel')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Stack spacing={3}>
              {DOEL_OPTIONS.map(option => (
                <Checkbox
                  key={option}
                  isChecked={doel.includes(option)}
                  onChange={() => setDoel(toggleArrayItem(doel, option))}
                  size="sm"
                >
                  {option}
                </Checkbox>
              ))}
            </Stack>
          </Flex>
        </Box>

        <Divider />

        {/* Sectie 4: Loopfunctie */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('loopfunctie')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Stack spacing={3}>
              {LOOPFUNCTIE_OPTIONS.map(option => (
                <Checkbox
                  key={option}
                  isChecked={loopfunctie.includes(option)}
                  onChange={() =>
                    setLoopfunctie(toggleArrayItem(loopfunctie, option))
                  }
                  size="sm"
                >
                  {option}
                </Checkbox>
              ))}
            </Stack>
          </Flex>
        </Box>

        <Divider />

        {/* Sectie 5: Leverancier & Bestel Datum */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('leverancier')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction={{base: 'column', md: 'row'}}
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Box flex={1}>
              <RadioGroup value={leverancier} onChange={setLeverancier}>
                <Stack spacing={3}>
                  {LEVERANCIER_OPTIONS.map(option => (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>
            <FormControl flex={1} maxW={{base: 'full', md: '300px'}}>
              <FormLabel fontSize="sm">{t('bestelDatum')}</FormLabel>
              <DatePickerField
                date={bestelDatum}
                onDateChanged={setBestelDatum}
                maxDate={null}
                isSmallVariant
              />
            </FormControl>
          </Flex>
        </Box>

        <Divider />

        {/* Sectie 6: Product Specificaties */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('productSpecificaties')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={4}>
              <FormControl>
                <FormLabel fontSize="sm">{t('artCode')}</FormLabel>
                <Input
                  placeholder={t('artCodePlaceholder')}
                  value={artCode}
                  onChange={e => setArtCode(e.target.value)}
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">{t('lengteMaat')}</FormLabel>
                <Input
                  type="number"
                  placeholder={t('lengteMaatPlaceholder')}
                  value={lengteMaat}
                  onChange={e => setLengteMaat(e.target.value)}
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">{t('wijdte')}</FormLabel>
                <Input
                  placeholder={t('wijdtePlaceholder')}
                  value={wijdte}
                  onChange={e => setWijdte(e.target.value)}
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">{t('kleur')}</FormLabel>
                <Input
                  placeholder={t('kleurPlaceholder')}
                  value={kleur}
                  onChange={e => setKleur(e.target.value)}
                  size="sm"
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm">{t('sluitingOsb')}</FormLabel>
                <Input
                  placeholder={t('sluitingPlaceholder')}
                  value={sluiting}
                  onChange={e => setSluiting(e.target.value)}
                  size="sm"
                />
              </FormControl>
            </SimpleGrid>
          </Flex>
        </Box>

        <Divider />

        {/* Sectie 7: Modules */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('modules')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            {/* Hallux valgus */}
            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={3}>
                {t('halluxValgus')}
              </Text>
              <HStack spacing={6} align="start">
                <Box>
                  <Checkbox
                    isChecked={halluxValgusLinks}
                    onChange={e => setHalluxValgusLinks(e.target.checked)}
                    size="sm"
                    mb={halluxValgusLinks ? 2 : 0}
                  >
                    {t('links')}
                  </Checkbox>
                  {halluxValgusLinks && (
                    <Stack spacing={2} ml={6}>
                      {HALLUX_MM_OPTIONS.map(option => (
                        <Checkbox
                          key={option}
                          isChecked={halluxValgusLinksMm === option}
                          onChange={() => setHalluxValgusLinksMm(option)}
                          size="sm"
                        >
                          {option}
                        </Checkbox>
                      ))}
                    </Stack>
                  )}
                </Box>

                <Box>
                  <Checkbox
                    isChecked={halluxValgusRechts}
                    onChange={e => setHalluxValgusRechts(e.target.checked)}
                    size="sm"
                    mb={halluxValgusRechts ? 2 : 0}
                  >
                    {t('rechts')}
                  </Checkbox>
                  {halluxValgusRechts && (
                    <Stack spacing={2} ml={6}>
                      {HALLUX_MM_OPTIONS.map(option => (
                        <Checkbox
                          key={option}
                          isChecked={halluxValgusRechtsMm === option}
                          onChange={() => setHalluxValgusRechtsMm(option)}
                          size="sm"
                        >
                          {option}
                        </Checkbox>
                      ))}
                    </Stack>
                  )}
                </Box>
              </HStack>
            </Box>

            <Divider my={4} />

            {/* Verdiepingen voorvoet */}
            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={3}>
                {t('verdiepingenVoorvoet')}
              </Text>
              <HStack spacing={6} align="start">
                <Box>
                  <Checkbox
                    isChecked={verdiepingenVoorvoetLinks}
                    onChange={e =>
                      setVerdiepingenVoorvoetLinks(e.target.checked)
                    }
                    size="sm"
                    mb={verdiepingenVoorvoetLinks ? 2 : 0}
                  >
                    {t('links')}
                  </Checkbox>
                  {verdiepingenVoorvoetLinks && (
                    <Stack spacing={2} ml={6}>
                      {VERDIEPING_MM_OPTIONS.map(option => (
                        <Checkbox
                          key={option}
                          isChecked={verdiepingenVoorvoetLinksMm === option}
                          onChange={() =>
                            setVerdiepingenVoorvoetLinksMm(option)
                          }
                          size="sm"
                        >
                          {option}
                        </Checkbox>
                      ))}
                    </Stack>
                  )}
                </Box>

                <Box>
                  <Checkbox
                    isChecked={verdiepingenVoorvoetRechts}
                    onChange={e =>
                      setVerdiepingenVoorvoetRechts(e.target.checked)
                    }
                    size="sm"
                    mb={verdiepingenVoorvoetRechts ? 2 : 0}
                  >
                    {t('rechts')}
                  </Checkbox>
                  {verdiepingenVoorvoetRechts && (
                    <Stack spacing={2} ml={6}>
                      {VERDIEPING_MM_OPTIONS.map(option => (
                        <Checkbox
                          key={option}
                          isChecked={verdiepingenVoorvoetRechtsMm === option}
                          onChange={() =>
                            setVerdiepingenVoorvoetRechtsMm(option)
                          }
                          size="sm"
                        >
                          {option}
                        </Checkbox>
                      ))}
                    </Stack>
                  )}
                </Box>
              </HStack>
            </Box>
          </Flex>
        </Box>

        <Divider />

        {/* Sectie 8: Basiscode SOS & Omschrijving */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('basiscodeSosEnOmschrijving')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                {t('basiscodeSos')}
              </Text>
              <RadioGroup value={basiscodeSOS} onChange={setBasiscodeSOS}>
                <Stack direction="row" spacing={4} flexWrap="wrap">
                  {BASISCODE_OPTIONS.map(option => (
                    <Radio key={option} value={option}>
                      {option}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </Box>

            <Box overflowX="auto">
              <Table size="sm" variant="simple">
                <Thead>
                  <Tr>
                    <Th>{t('omschrijvingCode')}</Th>
                    <Th textAlign="center">L</Th>
                    <Th textAlign="center">R</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {SUPPLEMENT_OPTIONS.map(supplement => (
                    <Tr key={supplement.key}>
                      <Td>
                        {supplement.label} ({supplement.code})
                      </Td>
                      <Td textAlign="center">
                        <Checkbox
                          isChecked={
                            supplements[supplement.key]?.links || false
                          }
                          onChange={() =>
                            toggleSupplement(supplement.key, 'links')
                          }
                          size="sm"
                        />
                      </Td>
                      <Td textAlign="center">
                        <Checkbox
                          isChecked={
                            supplements[supplement.key]?.rechts || false
                          }
                          onChange={() =>
                            toggleSupplement(supplement.key, 'rechts')
                          }
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

        {/* Sectie 9: Steunzolen */}
        <Box>
          <Text fontWeight="bold" mb={3} fontSize={{base: 'md', md: 'lg'}}>
            {t('steunzolen')}
          </Text>
          <Flex
            gap={{base: 4, md: 6}}
            direction="column"
            border="1px solid"
            borderColor="inherit"
            borderRadius="md"
            p={4}
            mt={2}
          >
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                {t('steunzoolType')}
              </Text>
              <Stack spacing={2} mb={4}>
                {STEUNZOOL_TYPES.map(option => (
                  <Box key={option}>
                    <Checkbox
                      isChecked={steunzoolType.includes(option)}
                      onChange={() =>
                        setSteunzoolType(toggleArrayItem(steunzoolType, option))
                      }
                      size="sm"
                    >
                      {option}
                    </Checkbox>
                    {option === 'Anders' && steunzoolType.includes(option) && (
                      <Input
                        placeholder={t('andersSpecificeer')}
                        value={steunzoolTypeAnders}
                        onChange={e => setSteunzoolTypeAnders(e.target.value)}
                        size="sm"
                        ml={6}
                        mt={2}
                        maxW="300px"
                      />
                    )}
                  </Box>
                ))}
              </Stack>
            </Box>

            <Divider />

            <SimpleGrid columns={{base: 1, md: 2}} spacing={4}>
              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  {t('correctieMiddenvoet')}
                </Text>
                <Stack spacing={2}>
                  {CORRECTIE_MIDDENVOET.map(option => (
                    <Checkbox
                      key={option}
                      isChecked={steunzoolCorrectieMiddenvoet === option}
                      onChange={() => setSteunzoolCorrectieMiddenvoet(option)}
                      size="sm"
                    >
                      {option}
                    </Checkbox>
                  ))}
                </Stack>
              </Box>

              <Box>
                <Text fontSize="sm" fontWeight="medium" mb={2}>
                  {t('correctieVoorvoet')}
                </Text>
                <Stack spacing={2}>
                  {CORRECTIE_VOORVOET.map(option => (
                    <Checkbox
                      key={option}
                      isChecked={steunzoolCorrectieVoorvoet === option}
                      onChange={() => setSteunzoolCorrectieVoorvoet(option)}
                      size="sm"
                    >
                      {option}
                    </Checkbox>
                  ))}
                </Stack>
              </Box>
            </SimpleGrid>

            <Divider />

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                {t('vvPellote')}
              </Text>
              <Stack spacing={2}>
                {PELLOTE_OPTIONS.map(option => (
                  <Checkbox
                    key={option}
                    isChecked={steunzoolVvPellote === option}
                    onChange={() => setSteunzoolVvPellote(option)}
                    size="sm"
                  >
                    {option}
                  </Checkbox>
                ))}
              </Stack>
            </Box>

            <Divider />

            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={2}>
                {t('hakVerhogingCm')}
              </Text>
              <SimpleGrid columns={{base: 1, sm: 2}} spacing={4}>
                <FormControl>
                  <FormLabel fontSize="sm">{t('links')}</FormLabel>
                  <Input
                    type="number"
                    placeholder={t('hakVerhogingPlaceholder')}
                    value={steunzoolHakVerhogingLinks}
                    onChange={e =>
                      setSteunzoolHakVerhogingLinks(e.target.value)
                    }
                    size="sm"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="sm">{t('rechts')}</FormLabel>
                  <Input
                    type="number"
                    placeholder={t('hakVerhogingPlaceholder')}
                    value={steunzoolHakVerhogingRechts}
                    onChange={e =>
                      setSteunzoolHakVerhogingRechts(e.target.value)
                    }
                    size="sm"
                  />
                </FormControl>
              </SimpleGrid>
            </Box>
          </Flex>
        </Box>

        <Divider />

        {/* Bijzonderheden */}
        <Box>
          <Text fontWeight="bold" mb={4} fontSize={{base: 'md', md: 'lg'}}>
            {t('bijzonderheden')}
          </Text>
          <Textarea
            placeholder={t('bijzonderhedenPlaceholder')}
            value={bijzonderheden}
            onChange={e => setBijzonderheden(e.target.value)}
            minH={{base: '100px', md: '120px'}}
          />
        </Box>

        {/* Submit button */}
        <Flex justifyContent={{base: 'stretch', sm: 'flex-end'}} mt={4}>
          <Button
            variant="primary"
            onClick={handleSubmit}
            w={{base: 'full', sm: 'auto'}}
          >
            {t('opslaanEnDoorgaan')}
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};

export default FormIntakeOSBPage;
