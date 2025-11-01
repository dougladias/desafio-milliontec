import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInput } from '../forms';
import { ClientFormActions } from './ClientFormActions';
import { clientSchema } from '../../validations';
import { clientService } from '../../services/clientService';
import type { CreateClientDTO } from '../../types';
import { formatPhoneInput, formatPhone, unformatPhone } from '../../utils/formatters';

interface ClientFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  clientId?: number;
}

export const ClientFormModal = ({ open, onClose, onSuccess, clientId }: ClientFormModalProps) => {
  const isEditMode = !!clientId;
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditMode);
  const [error, setError] = useState<string>('');

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

      const cleanData = {
        ...data,
        phone: formatPhone(unformatPhone(data.phone)),
      };

      if (isEditMode && clientId) {
        await clientService.update(clientId, cleanData);
      } else {
        await clientService.create(cleanData);
      }

      reset();
      onSuccess();
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
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
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
        }}
      >
        <Box sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#001E27' }}>
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

      <DialogContent sx={{ pt: 3 }}>
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

            <FormInput
              register={register('address')}
              label="Endereço"
              multiline
              rows={3}
              error={errors.address?.message}
              disabled={loading}
            />

            <ClientFormActions loading={loading} onCancel={handleClose} />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};
