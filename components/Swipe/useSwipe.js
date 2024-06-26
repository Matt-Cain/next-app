import React, { useCallback, useEffect, useState, useRef, useReducer } from 'react';
import { useEventListener, useMergedRef } from '@mantine/hooks';
import useScreenLock from '@/hooks/useScreenLock';

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
  const screen = useScreenLock();
  const swipeItemRef = useRef(null);

  const timedOnSwipe = () => {
    setTimeout(() => {
      onSwipe(state.swiped);
    }, 300);
  };

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
    setState({ pointerStartX: event.clientX, pointerDown: true });
  };

  const handlePointerMove = (event) => {
    if (!state.pointerDown) return;

    const currentX = event.clientX;
    const offset = currentX - state.pointerStartX;
    setState({ offset });
  };

  const handlePointerUp = () => {
    screen.unlock();
    setState({ pointerDown: false, offset: 0 });

    const { left, width } = getRect(swipeItemRef);
    const offset = left - state.initialRect.left;

    if (offset > width / 4) {
      setState({ offset: width });
      timedOnSwipe(SWIPED.RIGHT);
    } else if (offset < -width / 4) {
      setState({ offset: -width });
      timedOnSwipe(SWIPED.LEFT);
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
