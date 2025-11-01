import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { clientService } from '../../services/clientService';
import type { Client } from '../../types';
import { generateClientsPDF } from '../../utils/pdfGenerator';
import { ClientFormModal } from './ClientFormModal';

export const ClientList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | undefined>();

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    // Se tiver o parâmetro ?new=true na URL, abre o modal
    if (searchParams.get('new') === 'true') {
      setModalOpen(true);
      // Remove o parâmetro da URL
      searchParams.delete('new');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams]);

  const loadClients = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await clientService.getAll();
      setClients(data);
    } catch (err) {
      const errorMessage = err instanceof Error && 'response' in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : 'Erro ao carregar clientes';
      setError(errorMessage || 'Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    setSelectedClientId(id);
    setModalOpen(true);
  };

  const handleNew = () => {
    setSelectedClientId(undefined);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedClientId(undefined);
  };

  const handleSuccess = () => {
    loadClients();
    setSuccessMessage('Cliente salvo com sucesso!');
  };

  const handleGeneratePDF = () => {
    if (clients.length === 0) {
      setError('Não há clientes para gerar o PDF');
      return;
    }
    generateClientsPDF(clients);
    setSuccessMessage('PDF gerado com sucesso!');
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" component="h1" fontWeight={700} sx={{ color: '#001E27' }}>
            Clientes
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Gerencie todos os seus clientes cadastrados
          </Typography>
        </Box>
        <Box display="flex" gap={2}>
          <Button
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            onClick={handleGeneratePDF}
            disabled={loading || clients.length === 0}
            sx={{
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              },
            }}
          >
            Gerar PDF
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNew}
          >
            Novo Cliente
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box display="flex" justifyContent="center" py={8}>
          <CircularProgress />
        </Box>
      ) : clients.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h6" color="text.secondary" fontWeight={600}>
            Nenhum cliente cadastrado
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Clique em "Novo Cliente" para começar
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#F5F7FA' }}>
                <TableCell sx={{ fontWeight: 700, color: '#001E27', width: '80px' }}>#</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#001E27' }}>Nome</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#001E27' }}>E-mail</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#001E27' }}>Telefone</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#001E27' }}>Endereço</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: '#001E27' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client, index) => (
                <TableRow
                  key={client.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': {
                      bgcolor: '#F5F7FA',
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600, color: '#666' }}>{index + 1}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#001E27' }}>{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleEdit(client.id)}
                      size="small"
                      sx={{
                        color: '#00D9C0',
                        '&:hover': {
                          bgcolor: '#00D9C020',
                        },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        message={successMessage}
      />

      <ClientFormModal
        open={modalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
        clientId={selectedClientId}
      />
    </Box>
  );
};
