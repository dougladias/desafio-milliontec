import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import type { Client } from '../../types';

interface ClientDeleteConfirmProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  client: Client | null;
}

export const ClientDeleteConfirm = ({ open, onCancel, onConfirm, client }: ClientDeleteConfirmProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!client) return null;

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            m: isMobile ? 1 : 2,
          },
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <WarningAmberIcon sx={{ color: '#d32f2f', fontSize: 28 }} />
          <Typography variant="h6" fontWeight={600} sx={{ color: '#001E27' }}>
            Confirmar Exclusão
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Tem certeza que deseja excluir o cliente:
        </Typography>
        <Box
          sx={{
            bgcolor: '#f5f5f5',
            p: 2,
            borderRadius: 2,
            borderLeft: '4px solid #d32f2f',
          }}
        >
          <Typography variant="body1" fontWeight={600} sx={{ color: '#001E27' }}>
            {client.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {client.email}
          </Typography>
        </Box>
        <Typography variant="body2" color="error" sx={{ mt: 2, fontWeight: 500 }}>
          ⚠️ Esta ação não pode ser desfeita!
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          fullWidth={isMobile}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          fullWidth={isMobile}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};
