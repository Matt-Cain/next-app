import React, { useCallback, useEffect, useState, useRef, useReducer } from 'react';
import { Card, Center, Group, Text } from '@mantine/core';
import { useEventListener, useMergedRef } from '@mantine/hooks';
import { MdDelete } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';

const SWIPED = {
  LEFT: 'left',
  RIGHT: 'right',
  NONE: 'none',
};

const stopEvent = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

const getRect = (ref) => ref?.current?.getBoundingClientRect() || { left: 0, width: 0 };

const reducer = (prevState, nextState) => ({ ...prevState, ...nextState });

const initialState = {
  pointerStartX: null,
  offset: 0,
  pointerDown: false,
  initialRect: { left: 0, width: 0 },
  swiped: SWIPED.NONE,
};

const useSwipe = ({ onSwipe }) => {
  const [state, setState] = useReducer(reducer, initialState);
  const swipeItemRef = useRef(null);

  useEffect(() => {
    if (!swipeItemRef?.current) return;

    const rect = getRect(swipeItemRef);
    setState({ initialRect: rect });
  }, []);

  const handleResize = () => {
    const rect = getRect(swipeItemRef);
    setState({ initialRect: rect });
  };

  const handlePointerStart = (event) => {
    stopEvent(event);
    setState({ pointerStartX: event.clientX, pointerDown: true });
  };

  const handlePointerMove = (event) => {
    if (!state.pointerDown) return;
    stopEvent(event);

    const currentX = event.clientX;
    const offset = currentX - state.pointerStartX;
    setState({ offset });
  };

  const handlePointerUp = () => {
    setState({ pointerDown: false, offset: 0 });

    const { left, width } = getRect(swipeItemRef);
    const offset = left - state.initialRect.left;

    if (offset > width / 2) {
      setState({ offset: width });
      onSwipe(SWIPED.RIGHT);
    } else if (offset < -width / 2) {
      setState({ offset: -width });
      onSwipe(SWIPED.LEFT);
    }
  };

  const currentRect = getRect(swipeItemRef);
  const swipeDirection = state.initialRect.left > currentRect.left ? 'left' : 'right';

  const getStyle = useCallback(
    () => ({
      transform: `translateX(${state.offset}px)`,
      transition: !state.pointerDown ? 'transform 0.4s ease-in-out' : 'none',
    }),
    [state.offset, state.pointerDown]
  );

  const style = getStyle();

  const start = useEventListener('pointerdown', handlePointerStart, { passive: false });
  const move = useEventListener('pointermove', handlePointerMove, { passive: false });
  const end = useEventListener('pointerup', handlePointerUp, { passive: false });
  const resize = useEventListener('resize', handleResize, { passive: true });

  const ref = useMergedRef(swipeItemRef, start, move, end, resize);

  return { ref, style, swipeDirection };
};

export default useSwipe;
