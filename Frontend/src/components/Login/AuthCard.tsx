import { Box, Card, CardContent, Typography } from '@mui/material';
import logoMilliontech from '../../assets/logo_milliontech.webp';

interface AuthCardProps {
  children: React.ReactNode;
  subtitle?: string;
}

export const AuthCard = ({ children, subtitle = 'Sistema de Cadastro de Clientes' }: AuthCardProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0A2540 0%, #0D3A5F 100%)',
      }}
    >
      <Card
        sx={{
          maxWidth: 450,
          width: '100%',
          m: 2,
          bgcolor: '#FFFFFF',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
            <Box
              component="img"
              src={logoMilliontech}
              alt="MillionTech"
              sx={{
                width: '220px',
                mb: 3,
              }}
            />
            <Typography
              variant="body1"
              color="text.secondary"
              fontWeight={500}
              sx={{ fontSize: '0.95rem' }}
            >
              {subtitle}
            </Typography>
          </Box>

          {children}
        </CardContent>
      </Card>
    </Box>
  );
};
