import React from 'react';

import { Flex, Text } from '@chakra-ui/react'
import SectionBox from '../components/SectionBox';

function SectionBoxes(props) {
  let textSize = { base: "m", sm: "l"}
  let statuses = props.statuses
  return (
    <Flex direction='column' h='fit-content' w='100%' justifyContent='center' my='0.1rem'>
      {
        statuses.map(status => {
          return (<SectionBox status={status}/>)
        })
      }
    </Flex>
  );
}

export default SectionBoxes;
