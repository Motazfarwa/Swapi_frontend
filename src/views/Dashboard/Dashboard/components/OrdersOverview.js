// Chakra imports
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TimelineRow from "components/Tables/TimelineRow";
import React from "react";

const OrdersOverview = ({ title, amount, data }) => {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Card maxH='100%'>
      <CardHeader p='22px 0px 35px 14px'>
        <Flex direction='column'>
          <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
            {title}
          </Text>
          <Text fontSize='sm' color='gray.400' fontWeight='normal'>
            <Text fontWeight='bold' as='span' color='teal.300'>
              {`${amount}%`}
            </Text>{" "}
            this month.
          </Text>
        </Flex>
      </CardHeader>
      <CardBody ps='20px' pe='0px' mb='31px' position='relative'>
        <Flex direction='column'>
          {data.map((row, index, arr) => {
            return (
              <TimelineRow
              key={row?.title || index} // Ensure `key` is always unique, fallback to `index` if `title` is not available
              logo={row?.logo || 'defaultLogo.png'} // Provide a default logo if `row.logo` is undefined
              title={row?.title || 'Untitled'} // Provide a fallback for the title
              date={row?.date || 'Not Available'} // Provide a fallback for the date
              color={row?.color || '#000000'} // Default to black if `row.color` is undefined
              index={index}
              arrLength={Array.isArray(arr) ? arr.length : 0} // Check if arr is an array before accessing its length
            />
            
            );
          })}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default OrdersOverview;
