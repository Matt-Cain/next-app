'use client';

import { createTheme, virtualColor } from '@mantine/core';

export const theme = createTheme({
  cursorType: 'pointer',
  colors: {
    primary: virtualColor({
      name: 'primary',
      dark: 'pink',
      light: 'cyan',
    }),
  },
});
