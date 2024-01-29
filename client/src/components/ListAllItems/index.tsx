import {
  Box,
  Collapse,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Domain } from "../../api";
import { ISingleTag } from "../../types";

const ListAllItems = ({ data }: { data: Domain }) => {
  const [show, setShow] = useState(false);

  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab fontSize={"xs"} p={2} py={1} onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel p={2} pb={0}>
          <Collapse in={show} animateOpacity>
            <Box>
              {!data.usedPW && !data.password && <Text>No history yet!</Text>}
              {data.password && <SingleTag name={data.password} bg="green" />}
              {data.usedPW &&
                [...data.usedPW]
                  .reverse()
                  .map((item: string) => <SingleTag key={item} name={item} />)}
            </Box>
          </Collapse>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const SingleTag = ({ name, bg = "gray" }: ISingleTag) => {
  return (
    <Tag
      size={"md"}
      borderRadius="full"
      variant="solid"
      pb={0.9}
      m={0.5}
      colorScheme={bg}
    >
      <TagLabel>{name}</TagLabel>
    </Tag>
  );
};

export default ListAllItems;
