import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import ApolloWrapper from '@/components/ApolloWrapper';
import { theme } from '../theme';
import Layout from '@/pages/MealPlan/Layout';

export const metadata = {
  title: 'Meal Plan',
  description: 'I am using Mantine with Next.js!',
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
        <MantineProvider theme={theme}>
          <ApolloWrapper>
            <Layout>{children}</Layout>
          </ApolloWrapper>
        </MantineProvider>
      </body>
    </html>
  );
}
