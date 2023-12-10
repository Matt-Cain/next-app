import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import ApolloWrapper from '@/components/ApolloWrapper';
import { theme } from '../theme';

export const metadata = {
  title: 'Meal Plan',
  description: 'Meal Plan',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <ApolloWrapper>
          <MantineProvider theme={theme}>
            <Notifications position="bottom-center" />
            <ModalsProvider>{children}</ModalsProvider>
          </MantineProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
