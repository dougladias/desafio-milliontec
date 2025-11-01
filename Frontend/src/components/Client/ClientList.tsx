import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import { clientService } from '../../services/clientService';
import type { Client } from '../../types';
import { generateClientsPDF } from '../../utils/pdfGenerator';
import { ClientListHeader } from './ClientListHeader';
import { ClientTable } from './ClientTable';
import { ClientFormModal } from './ClientFormModal';
import { ClientViewModal } from './ClientViewModal';
import { ClientDeleteConfirm } from './ClientDeleteConfirm';

export const ClientList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<number | undefined>();
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

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
    const client = clients.find(c => c.id === id);
    if (client) {
      setSuccessMessage(`Editando dados de ${client.name}`);
    }
    setSelectedClientId(id);
    setModalOpen(true);
  };

  const handleView = (client: Client) => {
    setSelectedClient(client);
    setViewModalOpen(true);
    setSuccessMessage(`Visualizando dados de ${client.name}`);
  };

  const handleNew = () => {
    setSuccessMessage('Cadastrando novo cliente');
    setSelectedClientId(undefined);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedClientId(undefined);
  };

  const handleViewModalClose = () => {
    setViewModalOpen(false);
    setSelectedClient(null);
  };

  const handleDeleteClick = (client: Client) => {
    setSuccessMessage(`Excluindo dados de ${client.name}`);
    setClientToDelete(client);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setClientToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (!clientToDelete) return;

    try {
      const clientName = clientToDelete.name;
      await clientService.delete(clientToDelete.id);
      setDeleteConfirmOpen(false);
      setClientToDelete(null);
      loadClients();
      setSuccessMessage(`Cliente ${clientName} excluído com sucesso!`);
    } catch (err) {
      const errorMessage = err instanceof Error && 'response' in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : 'Erro ao excluir cliente';
      setError(errorMessage || 'Erro ao excluir cliente');
      setDeleteConfirmOpen(false);
      setClientToDelete(null);
    }
  };

  const handleSuccess = (message: string) => {
    loadClients();
    setSuccessMessage(message);
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
      <ClientListHeader
        loading={loading}
        clientsCount={clients.length}
        onGeneratePDF={handleGeneratePDF}
        onNewClient={handleNew}
      />

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
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 1 }}>
          <Typography variant="h6" color="text.secondary" fontWeight={600}>
            Nenhum cliente cadastrado
          </Typography>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Clique em "Novo Cliente" para começar
          </Typography>
        </Paper>
      ) : (
        <ClientTable
          clients={clients}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />
      )}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      </Snackbar>

      <ClientFormModal
        open={modalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
        clientId={selectedClientId}
      />

      <ClientViewModal
        open={viewModalOpen}
        onClose={handleViewModalClose}
        client={selectedClient}
      />

      <ClientDeleteConfirm
        open={deleteConfirmOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        client={clientToDelete}
      />
    </Box>
  );
};
