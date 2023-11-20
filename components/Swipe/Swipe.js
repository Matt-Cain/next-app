import React, { useEffect, useState, useRef, useReducer } from 'react';
import { Paper, Card, Center, Group, Text } from '@mantine/core';
import { useEventListener, useMergedRef } from '@mantine/hooks';
import { MdDelete } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';
import useSwipe from './useSwipe';

const cardStyle = {
  cursor: 'pointer',
  marginTop: '20px',
  position: 'relative',
  height: '50px',
  borderRadius: '10px',
};

const getStyle = ({ visible, styles }) => ({
  ...styles,
  inset: 0,
  position: 'absolute',
  visibility: visible ? 'visible' : 'hidden',
});

const Section = ({ background, children, grow, justify, slideRef, styles, visible }) => (
  <Group
    bg={background}
    c="white"
    grow={grow}
    justify={justify}
    p="10"
    ref={slideRef}
    style={getStyle({ visible, styles })}
  >
    {children}
  </Group>
);

const Delete = ({ visible }) => (
  <Section justify="flex-end" background="red" visible={visible}>
    <Text>Remove</Text>
    <MdDelete />
  </Section>
);

const Add = ({ visible }) => (
  <Section justify="flex-start" background="green" visible={visible}>
    <IoAddCircleOutline size="20" />
    <Text>Add</Text>
  </Section>
);

const Item = ({ children, slideRef, style }) => (
  <Section
    background="gray"
    grow
    slideRef={slideRef}
    styles={{ ...style, borderRadius: '10px' }}
    visible={true}
  >
    <Center draggable="false">{children}</Center>
  </Section>
);

const Swipe = ({ children, onSwipe }) => {
  const { ref, style, swipeDirection } = useSwipe({ onSwipe });

  const isAddVisible = swipeDirection === 'right';
  const isDeleteVisible = swipeDirection === 'left';

  return (
    <Card style={cardStyle}>
      <Add visible={isAddVisible} />
      <Delete visible={isDeleteVisible} />
      <Item slideRef={ref} style={style}>
        {children}
      </Item>
    </Card>
  );
};

export default Swipe;
