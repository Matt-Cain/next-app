'use client';

import { AppShell } from '@mantine/core';
import useAuth from '@/hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { loading } = useAuth();

  if (loading) return null;

  return (
    <AppShell>
      <AppShell.Main style={{ height: '100dvh', marginBottom: '60px', overflowY: 'auto' }}>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

export default Layout;
