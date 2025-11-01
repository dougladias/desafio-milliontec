import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { StatCard } from './StatCard';
import { QuickActions } from './QuickActions';
import { SystemFeatures } from './SystemFeatures';
import { clientService } from '../../services/clientService';

export const DashboardContent = () => {
  const [totalClients, setTotalClients] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const clients = await clientService.getAll();
      setTotalClients(clients.length);
    } catch (error) {
      console.error('Erro ao carregar estatísticas', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h4" component="h1" fontWeight={700} gutterBottom sx={{ color: '#001E27' }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bem-vindo ao <strong>Sistema de Clientes MillionTech</strong>
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              },
              gap: 3,
              mb: 4,
            }}
          >
            <StatCard
              title="Total de Clientes"
              value={totalClients}
              icon={<PeopleIcon sx={{ fontSize: 28 }} />}
              color="#00D9C0"
            />
            <StatCard
              title="Novos este Mês"
              value={totalClients}
              icon={<PersonAddIcon sx={{ fontSize: 28 }} />}
              color="#F5A623"
            />
            <StatCard
              title="Taxa de Crescimento"
              value="+100%"
              icon={<TrendingUpIcon sx={{ fontSize: 28 }} />}
              color="#1976D2"
            />
          </Box>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '2fr 1fr',
              },
              gap: 3,
            }}
          >
            <QuickActions />
            <SystemFeatures />
          </Box>
        </>
      )}
    </Box>
  );
};
