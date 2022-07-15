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
  Button,
  Box,
} from '@chakra-ui/react';
import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';

export default function TrackingForm({ heading, inputs = [] }) {
  const [inputValues, setInputValues] = React.useState({});
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await apiClient.addTracking(heading.toLowerCase(), {
        [heading.toLowerCase()]: inputValues,
      });
      navigate(`/${heading.toLowerCase()}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Center>
      <Stack margin={10} spacing={3} minW="50%" maxW="2000px">
        <Heading>Log {heading}</Heading>
        {inputs.map((input, i) => {
          switch (input.type) {
            case 'text':
              return (
                <Box key={i}>
                  <Text mb={3}>{input.name}</Text>
                  <Input
                    type={input.type}
                    size="md"
                    onChange={(e) => {
                      inputValues[input.dbName] = e.target.value;
                      setInputValues({ ...inputValues });
                    }}
                    value={inputValues[input.dbName]}
                  />
                </Box>
              );
            case 'number':
              return (
                <Box key={i}>
                  <Text>{input.name}</Text>
                  <NumberInput>
                    <NumberInputField
                      onChange={(e) => {
                        inputValues[input.dbName] = e.target.value;
                        setInputValues({ ...inputValues });
                      }}
                      value={inputValues[input.dbName]}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              );
            case 'date':
              return (
                <Center key={i}>
                  <Stack m="5">
                    <Text mr={7} display="block">
                      {input.name}
                    </Text>
                    <DateTimePicker
                      onChange={(date) => {
                        inputValues[input.dbName] = new Date(date);
                        setInputValues({ ...inputValues });
                      }}
                      value={inputValues[input.dbName]}
                    />
                  </Stack>
                </Center>
              );
            default:
              return null;
          }
        })}
        <Center>
          <Button onClick={handleSubmit}>Submit</Button>
        </Center>
      </Stack>
    </Center>
  );
}
