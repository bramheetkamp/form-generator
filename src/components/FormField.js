import React from "react";
import {
  Box,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";

const FormField = ({ field }) => {
  const { control, register } = useFormContext();

  return (
    <Box mb={4}>
      <Text mb={1} fontWeight="semibold">
        {field.label}
      </Text>

      {field.type === "textarea" ? (
        <Textarea {...register(field.name)} />
      ) : field.type === "number" ? (
        <Controller
          control={control}
          name={field.name}
          render={({ field: controllerField }) => (
            <NumberInput onChange={val => controllerField.onChange(val)} value={controllerField.value}>
              <NumberInputField />
            </NumberInput>
          )}
        />
      ) : field.type === "date" ? (
        <Input type="date" {...register(field.name)} />
      ) : (
        <Input type={field.type || "text"} {...register(field.name)} />
      )}
    </Box>
  );
};

export default FormField;
