import { Box, Button, CircularProgress } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

interface ClientFormActionsProps {
  loading: boolean;
  onCancel: () => void;
}

export const ClientFormActions = ({ loading, onCancel }: ClientFormActionsProps) => {
  return (
    <Box display="flex" gap={2} mt={3}>
      <Button
        variant="outlined"
        onClick={onCancel}
        disabled={loading}
        sx={{
          minWidth: 120,
          borderColor: '#001E27',
          color: '#001E27',
          fontWeight: 500,
          '&:hover': {
            borderColor: '#003440',
            bgcolor: 'rgba(0, 30, 39, 0.04)',
          },
        }}
      >
        Cancelar
      </Button>
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
        sx={{
          minWidth: 120,
          bgcolor: '#001E27',
          color: '#FFFFFF',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0, 30, 39, 0.3)',
          '&:hover': {
            bgcolor: '#003440',
            boxShadow: '0 6px 16px rgba(0, 30, 39, 0.4)',
          },
        }}
      >
        {loading ? 'Salvando...' : 'Salvar'}
      </Button>
    </Box>
  );
};
