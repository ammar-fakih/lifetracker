import {
  Center,
  Heading,
  Input,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from '@chakra-ui/react';
import React from 'react';

export default function TrackingForm({ heading, inputs = [] }) {
  return (
    <Center>
      <Stack margin={10} spacing={3} w="50%" maxW="2000px">
        <Heading textAlign={'center'} color="white">
          Create {heading}
        </Heading>
        {inputs.map((input) => {
          switch (input.type) {
            case 'text':
              return (
                <Input
                  bgColor={'white'}
                  placeholder={input.name}
                  type={input.type}
                  size="md"
                />
              );
            case 'number':
              return (
                <>
                  <Text color="#fff">{input.name}</Text>
                  <NumberInput>
                    <NumberInputField bgColor="#fff" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </>
              );
            case 'date':
              return null;
            default:
              return null;
          }
        })}
      </Stack>
    </Center>
  );
}
