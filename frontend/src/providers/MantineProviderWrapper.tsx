import { MantineProvider } from '@mantine/core';
import type { ReactNode } from 'react';

interface MantineProviderWrapperProps {
  children: ReactNode;
}

export default function MantineProviderWrapper({ children }: MantineProviderWrapperProps) {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {children}
    </MantineProvider>
  );
}
