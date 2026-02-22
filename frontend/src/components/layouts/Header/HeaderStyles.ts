export const headerStyles = {
  header: {
    height: '60px',
    paddingLeft: 'var(--mantine-spacing-md)',
    paddingRight: 'var(--mantine-spacing-md)',
    borderBottom: '1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))',
  },
  icon: {
    width: 22,
    height: 22,
    stroke: '1.5',
  },
  actionIcon: {
    variant: 'default' as const,
    size: 'xl' as const,
    radius: 'md' as const,
  },

  group: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonLogin: {
    variant: 'default' as const,
  },
} as const;
