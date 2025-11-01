import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Alert,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Divider,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '../forms';
import { ClientFormActions } from './ClientFormActions';
import { AddressInput } from '../AddressInput';
import type { AddressData } from '../AddressInput/types';
import { clientSchema } from '../../validations';
import { clientService } from '../../services/clientService';
import type { CreateClientDTO } from '../../types';
import { formatPhoneInput, formatPhone, unformatPhone } from '../../utils/formatters';
import { formatAddressToString, parseAddressFromString } from '../../utils/addressHelpers';

interface ClientFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  clientId?: number;
}

export const ClientFormModal = ({ open, onClose, onSuccess, clientId }: ClientFormModalProps) => {
  const isEditMode = !!clientId;
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditMode);
  const [error, setError] = useState<string>('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Estado para armazenar os dados de endereço
  const [addressData, setAddressData] = useState<AddressData>({
    cep: '',
    street: '',
    neighborhood: '',
    city: '',
    state: '',
    complement: '',
    number: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CreateClientDTO>({
    resolver: yupResolver(clientSchema),
  });

  const phoneValue = watch('phone');

  const loadClient = async () => {
    if (!clientId) return;

    try {
      setLoadingData(true);
      const client = await clientService.getById(clientId);
      setValue('name', client.name);
      setValue('email', client.email);
      setValue('phone', client.phone);
      setValue('address', client.address);

      // Tenta fazer o parse do endereço existente
      const parsedAddress = parseAddressFromString(client.address);
      setAddressData({
        cep: parsedAddress.cep || '',
        street: parsedAddress.street || '',
        neighborhood: parsedAddress.neighborhood || '',
        city: parsedAddress.city || '',
        state: parsedAddress.state || '',
        complement: parsedAddress.complement || '',
        number: parsedAddress.number || '',
      });
    } catch (err) {
      const errorMessage = err instanceof Error && 'response' in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : 'Erro ao carregar cliente';
      setError(errorMessage || 'Erro ao carregar cliente');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (open && isEditMode) {
      loadClient();
    } else if (open && !isEditMode) {
      reset();
      setError('');
      // Limpa o endereço ao abrir modal de novo cliente
      setAddressData({
        cep: '',
        street: '',
        neighborhood: '',
        city: '',
        state: '',
        complement: '',
        number: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, clientId, isEditMode]);

  useEffect(() => {
    if (phoneValue) {
      const formatted = formatPhoneInput(phoneValue);
      if (formatted !== phoneValue) {
        setValue('phone', formatted);
      }
    }
  }, [phoneValue, setValue]);

  const onSubmit = async (data: CreateClientDTO) => {
    try {
      setLoading(true);
      setError('');

      // Converte os dados de endereço em string para enviar ao backend
      const addressString = formatAddressToString(addressData);

      const cleanData = {
        ...data,
        phone: formatPhone(unformatPhone(data.phone)),
        address: addressString, // Usa o endereço formatado do AddressInput
      };

      if (isEditMode && clientId) {
        await clientService.update(clientId, cleanData);
        onSuccess('Cliente atualizado com sucesso!');
      } else {
        await clientService.create(cleanData);
        onSuccess('Cliente cadastrado com sucesso!');
      }

      reset();
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error && 'response' in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : `Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} cliente`;
      setError(errorMessage || `Erro ao ${isEditMode ? 'atualizar' : 'cadastrar'} cliente`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      reset();
      setError('');
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          {isEditMode ? 'Editar Cliente' : 'Novo Cliente'}
        </Box>
        <IconButton
          onClick={handleClose}
          disabled={loading}
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
        {loadingData ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
                {error}
              </Alert>
            )}

            <FormInput
              register={register('name')}
              label="Nome"
              autoFocus
              error={errors.name?.message}
              disabled={loading}
            />

            <FormInput
              register={register('email')}
              label="E-mail"
              type="email"
              error={errors.email?.message}
              disabled={loading}
            />

            <FormInput
              register={register('phone')}
              label="Telefone"
              placeholder="(99) 99999-9999"
              error={errors.phone?.message}
              disabled={loading}
            />

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary" fontWeight={600}>
                Endereço
              </Typography>
            </Divider>

            <AddressInput
              onAddressChange={setAddressData}
              initialAddress={addressData}
              disabled={loading}
            />

            <ClientFormActions loading={loading} onCancel={handleClose} />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
