import React from 'react';

import { Flex, Text } from '@chakra-ui/react'
import CourseBox from '../components/CourseBox';

function CourseBoxes(props) {
  let textSize = { base: "m", sm: "l"}
  let details = [{statuses: [2, 1, 0]}, {statuses: [1, 1]}, {statuses: [2]}]
  return (
    <Flex direction='row' flexWrap="wrap" h='fit-content' w="100%" my='0.1rem'>
      {
        details.map(details => {
          return (<CourseBox/>)
        })
      }
    </Flex>
  );
}

export default CourseBoxes;
