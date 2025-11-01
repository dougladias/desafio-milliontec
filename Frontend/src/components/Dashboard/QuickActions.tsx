import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <Card sx={{ borderRadius: 3, border: '1px solid #E0E0E0' }}>
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#001E27' }}>
          Ações Rápidas
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2.5}>
          Gerencie seus clientes de forma rápida e eficiente
        </Typography>
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => navigate('/clients?new=true')}
            fullWidth
            sx={{
              justifyContent: 'flex-start',
              py: 1.5,
              background: 'linear-gradient(135deg, #00D9C0 0%, #00B8A3 100%)',
              boxShadow: '0 4px 12px rgba(0, 217, 192, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #00B8A3 0%, #009688 100%)',
                boxShadow: '0 6px 16px rgba(0, 217, 192, 0.4)',
              },
            }}
          >
            Cadastrar Novo Cliente
          </Button>
          <Button
            variant="outlined"
            startIcon={<PeopleIcon />}
            onClick={() => navigate('/clients')}
            fullWidth
            sx={{
              justifyContent: 'flex-start',
              py: 1.5,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            Ver Todos os Clientes
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
