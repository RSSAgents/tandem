import type { ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';

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
