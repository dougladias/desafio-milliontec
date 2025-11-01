import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Collapse,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useViaCep } from './useViaCep';
import type { AddressInputProps, AddressData } from './types';

export const AddressInput = ({
  onAddressChange,
  initialAddress,
  disabled = false,
}: AddressInputProps) => {
  const { searchByCep, formatCep, loading, error, clearError } = useViaCep();

  const [address, setAddress] = useState<AddressData>({
    cep: initialAddress?.cep || '',
    street: initialAddress?.street || '',
    neighborhood: initialAddress?.neighborhood || '',
    city: initialAddress?.city || '',
    state: initialAddress?.state || '',
    complement: initialAddress?.complement || '',
    number: initialAddress?.number || '',
  });

  const [cepInput, setCepInput] = useState(initialAddress?.cep || '');

  useEffect(() => {
    onAddressChange(address);
  }, [address, onAddressChange]);

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setCepInput(formatted);

    // Se o CEP estiver completo (9 caracteres com máscara), busca automaticamente
    if (formatted.replace(/\D/g, '').length === 8) {
      handleSearchCep(formatted);
    }
  };

  const handleSearchCep = async (cep?: string) => {
    clearError();
    const cepToSearch = cep || cepInput;

    const result = await searchByCep(cepToSearch);

    if (result) {
      setAddress({
        ...result,
        number: address.number, // Mantém o número se já existir
        complement: address.complement, // Mantém complemento se já existir
      });
      setCepInput(formatCep(result.cep));
    }
  };

  const handleFieldChange = (field: keyof AddressData, value: string) => {
    setAddress(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Box>
      <Collapse in={!!error}>
        <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
          {error}
        </Alert>
      </Collapse>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {/* Linha 1: CEP (campo de busca) */}
        <TextField
          label="CEP"
          value={cepInput}
          onChange={handleCepChange}
          disabled={disabled || loading}
          placeholder="00000-000"
          fullWidth
          margin="normal"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <IconButton
                    onClick={() => handleSearchCep()}
                    disabled={disabled || cepInput.length < 8}
                    size="small"
                  >
                    <SearchIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />

        {/* Linha 2: Rua e Número */}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            label="Rua/Logradouro"
            value={address.street}
            onChange={(e) => handleFieldChange('street', e.target.value)}
            disabled={disabled}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Número"
            value={address.number}
            onChange={(e) => handleFieldChange('number', e.target.value)}
            disabled={disabled}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        {/* Linha 3: Bairro e Complemento */}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            label="Bairro"
            value={address.neighborhood}
            onChange={(e) => handleFieldChange('neighborhood', e.target.value)}
            disabled={disabled}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="Complemento"
            value={address.complement}
            onChange={(e) => handleFieldChange('complement', e.target.value)}
            disabled={disabled}
            placeholder="Apto, Bloco, etc."
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>

        {/* Linha 4: Cidade e UF */}
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
          <TextField
            label="Cidade"
            value={address.city}
            onChange={(e) => handleFieldChange('city', e.target.value)}
            disabled={disabled}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            label="UF"
            value={address.state}
            onChange={(e) => handleFieldChange('state', e.target.value.toUpperCase())}
            disabled={disabled}
            inputProps={{ maxLength: 2 }}
            fullWidth
            margin="normal"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
