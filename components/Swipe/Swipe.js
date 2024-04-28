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
  overflow: 'hidden',
  width: '100%',
  backgroundClip: 'padding-box',
};

const itemStyle = {
  touchAction: 'none',
  inset: 0,
  position: 'absolute',
  cursor: 'pointer',
  backgroundClip: 'padding-box',
};

const getStyle = ({ visible, styles }) => ({
  ...styles,
  inset: 0,
  position: 'absolute',
  visibility: visible ? 'visible' : 'hidden',
  backgroundClip: 'padding-box',
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
    <Text>Have at home</Text>
    <MdDelete />
  </Section>
);

const Add = ({ visible }) => (
  <Section justify="flex-start" background="green" visible={visible}>
    <IoAddCircleOutline size="20" />
    <Text>Add to cart</Text>
  </Section>
);

const Item = ({ children, slideRef, style }) => (
  <Paper bg="gray.9" ref={slideRef} style={{ ...itemStyle, ...style }}>
    <Group c="white" grow p="10">
      <Center draggable="false">{children}</Center>
    </Group>
  </Paper>
);

const Swipe = ({ children, id, onSwipe }) => {
  const handleSwipe = (direction) => onSwipe({ id, direction });
  const { ref, style, swipeDirection } = useSwipe({ onSwipe: handleSwipe });

  const isAddVisible = swipeDirection === 'right';
  const isDeleteVisible = swipeDirection === 'left';

  return (
    <Paper style={cardStyle} shadow="sm" radius="md">
      <Add visible={isAddVisible} />
      <Delete visible={isDeleteVisible} />
      <Item slideRef={ref} style={style}>
        {children}
      </Item>
    </Paper>
  );
};

export default Swipe;
