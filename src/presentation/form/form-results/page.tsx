import React, {useState} from 'react';
import {BaseLayout} from '@/presentation/base/baseLayout';
import {
  Box,
  Flex,
  Text,
  Button,
  Alert,
  AlertIcon,
  Divider,
  Code,
  useToast,
  Heading,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../../routes';
import {useAppSelector} from '@/domain/store/hooks';
import {
  PRACTITIONERS,
  LOCATION_OPTIONS,
  SALUTATION_OPTIONS,
  OMSLUITING_OPTIONS,
  SUPPLEMENT_TYPES,
  HAKSOORT_OPTIONS,
  LOOPZOOL_OPTIONS,
  SLUITING_OPTIONS,
  HAKSCHORING_TYPES,
  YES_NO,
  OPENSTAND_OPTIONS,
} from '@/presentation/form/constants/formConstants';

export const FormResultsPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const toast = useToast();
  const formData = useAppSelector(state => state.formData);

  // If no client data exists, redirect to new client page
  React.useEffect(() => {
    if (!formData.client) {
      router.push(Routes.form_new_client);
    }
  }, [formData.client, router]);

  if (!formData.client) {
    return null;
  }

  // Generate complete JSON with all data and constants
  const generateCompleteJSON = () => {
    // Resolve practitioner ID to name
    const resolvedClientData = formData.client
      ? {
          ...formData.client,
          practitionerName:
            PRACTITIONERS.find(p => p.value === formData.client?.practitionerId)
              ?.label || formData.client?.practitionerId,
        }
      : null;

    // Build result object with only non-null intake forms
    const result: any = {
      clientData: resolvedClientData,
    };

    // Only include intake forms that have data
    if (formData.intakeVLOS) {
      result.intakeVLOS = formData.intakeVLOS;
    }
    if (formData.intakePulman) {
      result.intakePulman = formData.intakePulman;
    }
    if (formData.intakeRebacare) {
      result.intakeRebacare = formData.intakeRebacare;
    }
    if (formData.intakeOSB) {
      result.intakeOSB = formData.intakeOSB;
    }
    if (formData.intakeOVAC) {
      result.intakeOVAC = formData.intakeOVAC;
    }
    if (formData.intakeSteunzolen) {
      result.intakeSteunzolen = formData.intakeSteunzolen;
    }

    // Only include constants that are used in the filled forms
    const constants: any = {};

    // Always include practitioner info if we have client data
    if (formData.client) {
      constants.practitioners = PRACTITIONERS;
      constants.locationOptions = LOCATION_OPTIONS;
      constants.salutationOptions = SALUTATION_OPTIONS;
    }

    // Include VLOS-specific constants if VLOS form is filled
    if (formData.intakeVLOS) {
      constants.omsluitingOptions = OMSLUITING_OPTIONS;
      constants.supplementTypes = SUPPLEMENT_TYPES;
      constants.haksoortOptions = HAKSOORT_OPTIONS;
      constants.loopzoolOptions = LOOPZOOL_OPTIONS;
      constants.sluitingOptions = SLUITING_OPTIONS;
      constants.hakschoringTypes = HAKSCHORING_TYPES;
      constants.yesNoOptions = YES_NO;
      constants.openstandOptions = OPENSTAND_OPTIONS;
    }

    result.constants = constants;
    result.generatedAt = new Date().toISOString();

    return result;
  };

  const jsonData = generateCompleteJSON();
  const jsonString = JSON.stringify(jsonData, null, 2);

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      toast({
        title: t('jsonCopied'),
        description: t('jsonCopiedDescription'),
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const renderFieldValue = (label: string, value: any) => {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    let displayValue = value;
    if (typeof value === 'boolean') {
      displayValue = value ? t('ja') : t('nee');
    } else if (typeof value === 'object') {
      displayValue = JSON.stringify(value);
    }

    return (
      <Box key={label}>
        <Text fontSize="sm" fontWeight="semibold" color="gray.600">
          {label}:
        </Text>
        <Text fontSize="md" mb={2}>
          {displayValue}
        </Text>
      </Box>
    );
  };

  const renderSection = (title: string, data: any) => {
    if (!data) {
      return null;
    }

    return (
      <Box>
        <Heading size="md" mb={3}>
          {title}
        </Heading>
        <VStack align="stretch" spacing={2}>
          {Object.entries(data).map(([key, value]) =>
            renderFieldValue(key, value)
          )}
        </VStack>
      </Box>
    );
  };

  return (
    <BaseLayout
      title={t('formResults')}
      showBackButton={true}
      onBackButtonClicked={() => router.push(Routes.overview)}
    >
      <Flex
        w="full"
        direction="column"
        bg="white"
        p={{base: 4, md: 6}}
        borderRadius="md"
        gap={{base: 4, md: 6}}
      >
        <Box>
          <Heading size="lg" mb={2}>
            {t('formResultsTitle')}
          </Heading>
          <Text fontSize="md" color="gray.600">
            {t('formResultsDescription')}
          </Text>
        </Box>

        <Alert status="success">
          <AlertIcon />
          {t('formDataComplete')}
        </Alert>

        {/* Display all form data */}
        <Box>
          <Heading size="md" mb={4}>
            {t('submittedData')}
          </Heading>

          {renderSection(t('clientData'), formData.client)}

          {formData.intakeVLOS && (
            <>
              <Divider my={4} />
              {renderSection(t('intakeVlos'), formData.intakeVLOS)}
            </>
          )}

          {formData.intakePulman && (
            <>
              <Divider my={4} />
              {renderSection(t('intakePulman'), formData.intakePulman)}
            </>
          )}

          {formData.intakeRebacare && (
            <>
              <Divider my={4} />
              {renderSection(t('intakeRebacare'), formData.intakeRebacare)}
            </>
          )}

          {formData.intakeOSB && (
            <>
              <Divider my={4} />
              {renderSection(t('intakeOsb'), formData.intakeOSB)}
            </>
          )}

          {formData.intakeOVAC && (
            <>
              <Divider my={4} />
              {renderSection(t('intakeOvac'), formData.intakeOVAC)}
            </>
          )}

          {formData.intakeSteunzolen && (
            <>
              <Divider my={4} />
              {renderSection(t('intakeSteunzolen'), formData.intakeSteunzolen)}
            </>
          )}
        </Box>

        <Divider />

        {/* JSON Output Section */}
        <Box>
          <HStack mb={4} justify="space-between">
            <Heading size="md">{t('jsonOutput')}</Heading>
            <Button colorScheme="blue" onClick={handleCopyJSON}>
              {t('copyJson')}
            </Button>
          </HStack>

          <Text fontSize="sm" color="gray.600" mb={3}>
            {t('jsonOutputDescription')}
          </Text>

          <Box
            bg="gray.50"
            p={4}
            borderRadius="md"
            border="1px solid"
            borderColor="gray.200"
            maxH="500px"
            overflowY="auto"
          >
            <Code
              display="block"
              whiteSpace="pre"
              fontSize="sm"
              p={0}
              bg="transparent"
            >
              {jsonString}
            </Code>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Flex gap={4} justifyContent="flex-end" mt={4}>
          <Button
            variant="outline"
            onClick={() => router.push(Routes.form_selection)}
          >
            {t('fillAnotherForm')}
          </Button>
          <Button
            variant="primary"
            onClick={() => router.push(Routes.overview)}
          >
            {t('backToOverview')}
          </Button>
        </Flex>
      </Flex>
    </BaseLayout>
  );
};
