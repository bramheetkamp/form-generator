import React, { useState } from "react";
import { ChakraProvider, defaultSystem, Box, SimpleGrid, Button } from "@chakra-ui/react";
import templates from "./templates";
import Header from "./components/Header";
import FormBuilder from "./components/FormBuilder";

function App() {
  const [activeTemplate, setActiveTemplate] = useState("");

  if (activeTemplate) {
    return (
      <ChakraProvider value={defaultSystem}>
        <Box maxW="md" mx="auto" p={4}>
          <FormBuilder
            templateName={activeTemplate}
            fields={templates[activeTemplate]}
            onBack={() => setActiveTemplate("")}
          />
        </Box>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider value={defaultSystem}>
      <Box maxW="md" mx="auto" p={4}>
        <Header />
        <SimpleGrid columns={1} spacing={6}>
          {Object.keys(templates).map(name => (
            <Button
              key={name}
              size="lg"
              colorScheme="teal"
              onClick={() => setActiveTemplate(name)}
            >
              {name}
            </Button>
          ))}
        </SimpleGrid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
