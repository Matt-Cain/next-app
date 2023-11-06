'use client';

import React from 'react';
import { Box, Grid, ActionIcon, Card, Center } from '@mantine/core';
import { IoMdAdd } from 'react-icons/io';

const AddItem = ({ handleClick, children }) => {
  return (
    <Box onClick={handleClick} style={{ cursor: 'pointer', marginTop: '20px' }}>
      <Card p="28">
        <Grid style={{ height: '100%' }}>
          <Grid.Col span={2}>
            {/* <ActionIcon variant="outline" color="gray" size="lg" radius="xl">
              <IoMdAdd style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon> */}
          </Grid.Col>
          <Grid.Col span={10} offset={-1}>
            <Center>{children}</Center>
          </Grid.Col>
        </Grid>
      </Card>
    </Box>
  );
};

export default AddItem;
