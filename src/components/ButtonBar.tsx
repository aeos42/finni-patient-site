import React from 'react';
import { Stack } from '@mui/material';

interface ButtonBarProps {
  children: React.ReactNode;
}

const ButtonBar: React.FC<ButtonBarProps> = ({ children }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        mb: 2,
        p: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 1,
      }}
    >
      {children}
    </Stack>
  );
};

export default ButtonBar;
