import { Box, Button } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import FormField from './FormField';
import * as XLSX from 'xlsx';
import { useRef, useState } from 'react';
import ReactToPdf from 'react-to-pdf';

const FormBuilder = ({ templateName, fields, onBack }) => {
  const methods = useForm();
  const [data, setData] = useState(null);
  const pdfRef = useRef();

  const onSubmit = (values) => setData(values);

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet([data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `${templateName}-data.xlsx`);
  };

  return (
    <Box>
      <Button onClick={onBack} mb={4}>← Terug</Button>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {fields.map(field => <FormField key={field.name} field={field} />)}
          <Button mt={4} colorScheme="teal" type="submit">Voorvertoning genereren</Button>
        </form>
      </FormProvider>

      {data && (
        <Box mt={8}>
          <Box ref={pdfRef} border="1px solid #ddd" p={4} borderRadius="md" bg="gray.50">
            {Object.entries(data).map(([k, v]) => (
              <Box key={k}><strong>{k}</strong>: {v}</Box>
            ))}
          </Box>
          <Button onClick={exportExcel} mt={4} colorScheme="yellow">Download als Excel</Button>
          <ReactToPdf targetRef={pdfRef} filename={`${templateName}-data.pdf`}>
            {({ toPdf }) => (
              <Button mt={4} ml={2} colorScheme="blue" onClick={toPdf}>
                Download als PDF
              </Button>
            )}
          </ReactToPdf>
        </Box>
      )}
    </Box>
  );
};

export default FormBuilder;
