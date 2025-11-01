import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface ClientFormHeaderProps {
  title: string;
  onBack: () => void;
}

export const ClientFormHeader = ({ title, onBack }: ClientFormHeaderProps) => {
  return (
    <Box mb={3}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{
          mb: 2,
          color: '#001E27',
          fontWeight: 500,
          '&:hover': {
            bgcolor: 'rgba(0, 30, 39, 0.04)',
          },
        }}
      >
        Voltar
      </Button>
      <Typography variant="h4" component="h1" fontWeight={600} color="#001E27">
        {title}
      </Typography>
    </Box>
  );
};
