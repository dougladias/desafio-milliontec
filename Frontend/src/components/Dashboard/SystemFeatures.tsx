import { Box, Card, CardContent, Typography } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

export const SystemFeatures = () => {
  const features = [
    {
      icon: <BusinessIcon fontSize="small" />,
      title: 'Gestão Completa',
      description: 'Cadastro de clientes',
      color: '#00D9C0',
    },
    {
      icon: <EmailIcon fontSize="small" />,
      title: 'Contatos',
      description: 'E-mail e telefone',
      color: '#F5A623',
    },
    {
      icon: <PhoneIcon fontSize="small" />,
      title: 'Relatórios PDF',
      description: 'Exportação de dados',
      color: '#1976D2',
    },
  ];

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: '1px solid #E0E0E0',
        background: 'linear-gradient(135deg, #F5F7FA 0%, #FFFFFF 100%)',
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography variant="h6" fontWeight={700} gutterBottom sx={{ color: '#001E27' }}>
          Recursos do Sistema
        </Typography>
        <Box display="flex" flexDirection="column" gap={1.5} mt={2}>
          {features.map((feature, index) => (
            <Box key={index} display="flex" alignItems="center" gap={1.5}>
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1.5,
                  bgcolor: `${feature.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: feature.color,
                }}
              >
                {feature.icon}
              </Box>
              <Box flex={1}>
                <Typography variant="body2" fontWeight={600}>
                  {feature.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {feature.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
