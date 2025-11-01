import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

interface ClientListHeaderProps {
  loading: boolean;
  clientsCount: number;
  onGeneratePDF: () => void;
  onNewClient: () => void;
}

export const ClientListHeader = ({
  loading,
  clientsCount,
  onGeneratePDF,
  onNewClient,
}: ClientListHeaderProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      justifyContent="space-between"
      alignItems={isMobile ? 'flex-start' : 'center'}
      mb={3}
      gap={isMobile ? 2 : 0}
    >
      <Box>
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h1"
          fontWeight={700}
          sx={{ color: '#001E27' }}
        >
          Clientes
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Gerencie todos os seus clientes cadastrados
        </Typography>
      </Box>
      <Box display="flex" gap={1} flexWrap="wrap" width={isMobile ? '100%' : 'auto'}>
        <Button
          variant="outlined"
          startIcon={!isMobile && <PictureAsPdfIcon />}
          onClick={onGeneratePDF}
          disabled={loading || clientsCount === 0}
          fullWidth={isMobile}
          size={isMobile ? 'medium' : 'large'}
          sx={{
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            },
          }}
        >
          {isMobile ? <PictureAsPdfIcon sx={{ mr: 1 }} /> : null}
          Gerar PDF
        </Button>
        <Button
          variant="contained"
          startIcon={!isMobile && <AddIcon />}
          onClick={onNewClient}
          fullWidth={isMobile}
          size={isMobile ? 'medium' : 'large'}
        >
          {isMobile ? <AddIcon sx={{ mr: 1 }} /> : null}
          Novo Cliente
        </Button>
      </Box>
    </Box>
  );
};
