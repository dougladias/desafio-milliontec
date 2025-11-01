import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Typography,
  Divider,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { Client } from '../../types';
import { parseAddressFromString } from '../../utils/addressHelpers';

interface ClientViewModalProps {
  open: boolean;
  onClose: () => void;
  client: Client | null;
}

export const ClientViewModal = ({ open, onClose, client }: ClientViewModalProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!client) return null;

  // Parse do endereço para exibir de forma estruturada
  const parsedAddress = parseAddressFromString(client.address);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            m: isMobile ? 1 : 2,
            maxHeight: isMobile ? '90vh' : 'calc(100vh - 64px)',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pb: 2,
          borderBottom: '1px solid #E0E0E0',
          px: isMobile ? 2 : 3,
          pt: isMobile ? 2 : 3,
        }}
      >
        <Box sx={{ fontSize: isMobile ? '1.125rem' : '1.25rem', fontWeight: 600, color: '#001E27' }}>
          Detalhes do Cliente
        </Box>
        <IconButton
          onClick={onClose}
          sx={{
            color: '#666',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.04)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 3, px: isMobile ? 2 : 3, pb: isMobile ? 2 : 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {/* Nome */}
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Nome
            </Typography>
            <Typography variant="body1" fontWeight={600} sx={{ mt: 0.5, color: '#001E27' }}>
              {client.name}
            </Typography>
          </Box>

          <Divider />

          {/* E-mail */}
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
              E-mail
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, color: '#001E27' }}>
              {client.email}
            </Typography>
          </Box>

          <Divider />

          {/* Telefone */}
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Telefone
            </Typography>
            <Typography variant="body1" sx={{ mt: 0.5, color: '#001E27' }}>
              {client.phone}
            </Typography>
          </Box>

          <Divider />

          {/* Endereço */}
          <Box>
            <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5, mb: 1.5 }}>
              Endereço
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {parsedAddress.cep && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ minWidth: '80px' }}>
                    CEP:
                  </Typography>
                  <Typography variant="body2" color="#001E27">
                    {parsedAddress.cep}
                  </Typography>
                </Box>
              )}
              {parsedAddress.street && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ minWidth: '80px' }}>
                    Rua:
                  </Typography>
                  <Typography variant="body2" color="#001E27">
                    {parsedAddress.street}
                  </Typography>
                </Box>
              )}
              {parsedAddress.number && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ minWidth: '80px' }}>
                    Número:
                  </Typography>
                  <Typography variant="body2" color="#001E27">
                    {parsedAddress.number}
                  </Typography>
                </Box>
              )}
              {parsedAddress.complement && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ minWidth: '80px' }}>
                    Complemento:
                  </Typography>
                  <Typography variant="body2" color="#001E27">
                    {parsedAddress.complement}
                  </Typography>
                </Box>
              )}
              {parsedAddress.neighborhood && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ minWidth: '80px' }}>
                    Bairro:
                  </Typography>
                  <Typography variant="body2" color="#001E27">
                    {parsedAddress.neighborhood}
                  </Typography>
                </Box>
              )}
              {parsedAddress.city && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ minWidth: '80px' }}>
                    Cidade:
                  </Typography>
                  <Typography variant="body2" color="#001E27">
                    {parsedAddress.city}
                  </Typography>
                </Box>
              )}
              {parsedAddress.state && (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ minWidth: '80px' }}>
                    Estado:
                  </Typography>
                  <Typography variant="body2" color="#001E27">
                    {parsedAddress.state}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>

          {client.createdAt && (
            <>
              <Divider />
              {/* Data de cadastro */}
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={600} sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Data de Cadastro
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, color: '#666' }}>
                  {new Date(client.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: isMobile ? 2 : 3, pb: isMobile ? 2 : 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          fullWidth={isMobile}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
