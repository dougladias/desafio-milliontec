import { Card, CardContent, Box } from '@mui/material';
import type { ReactNode } from 'react';

interface ClientFormCardProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export const ClientFormCard = ({ children, onSubmit }: ClientFormCardProps) => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)' }}>
      <CardContent sx={{ p: 4 }}>
        <Box component="form" onSubmit={onSubmit} noValidate>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};
