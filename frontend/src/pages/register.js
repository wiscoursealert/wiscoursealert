import React, {useRef} from 'react';

import { Box, Heading, Flex, Text, FormControl, FormLabel, Input, FormHelperText, Button } from '@chakra-ui/react'

function Register() {
  let titleSize = { base: "5xl", sm: "6xl", md: "8xl"}
  let textSize = { base: "xl", sm: "xl", md: "2xl"}
  return (
    <Flex direction='column' bg='white' color='#595959' justifyContent='center' h={window.innerHeight} alignItems='center'>
      <Flex justifyContent='center' alignItems='center'>
        <Heading fontSize={titleSize} color='#D8524E'>wisc</Heading><Heading fontSize={titleSize}>oursealert</Heading>
      </Flex>
      <Flex mx="1rem" mt="6rem" justifyContent='center' alignItems='center'>
        <Text fontSize={textSize} align='center'>Let badger emails you when your sections are open</Text>
      </Flex>
      <Flex mx="1rem" mt="2rem" justifyContent='center' alignItems='center' w="100%">
        <FormControl id="email">
          <Flex mx="1rem" mt="2rem" justifyContent='center' alignItems='center'>
            <Input fontSize={textSize} type="email" placeholder="Your email address" w='100%' maxW="50rem" h="3.5rem"/>
            <Button variant="solid" colorScheme="red" bg="#D8524E" color="white" ml="1rem" fontSize={textSize} w="12rem" h="3.5rem">Subscribe</Button>
          </Flex>
        </FormControl>
      </Flex>
    </Flex>
  );
}

export default Register;
