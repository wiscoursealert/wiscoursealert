import React, {useRef} from 'react';

import { Box, Heading, Flex, Text, FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/react'

function Register() {
  return (
    <Flex direction='column' bg='white' color='#595959' justifyContent='center' w='100%' h={window.innerHeight} alignItems='center'>
      <Flex>
        <Heading fontSize='8xl' color='#D8524E'>wisc</Heading><Heading fontSize='8xl'>oursealert</Heading>
      </Flex>
      <Flex mt="6rem">
        <Text fontSize='3xl'>Let badger emails you when your sections are open</Text>
      </Flex>
      <Flex mt="2rem">
        <FormControl id="email">
          <Flex>
            <Input fontSize='2xl' type="email" placeholder="Your email address" w="50rem" h="3.5rem"/>
            <Button variant="solid" colorScheme="red" bg="#D8524E" color="white" ml="1rem" fontSize='2xl' w="10rem" h="3.5rem">Subscribe</Button>
          </Flex>
        </FormControl>
      </Flex>
    </Flex>
  );
}

export default Register;
