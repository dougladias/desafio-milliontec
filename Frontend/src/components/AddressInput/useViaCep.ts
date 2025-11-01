import { useState } from 'react';
import axios from 'axios';
import type { ViaCepResponse, AddressData } from './types';

export const useViaCep = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const searchByCep = async (cep: string): Promise<AddressData | null> => {
    // Remove caracteres não numéricos
    const cleanCep = cep.replace(/\D/g, '');

    // Valida se tem 8 dígitos
    if (cleanCep.length !== 8) {
      setError('CEP deve conter 8 dígitos');
      return null;
    }

    try {
      setLoading(true);
      setError('');

      const response = await axios.get<ViaCepResponse>(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );

      if (response.data.erro) {
        setError('CEP não encontrado');
        return null;
      }

      const addressData: AddressData = {
        cep: response.data.cep,
        street: response.data.logradouro,
        neighborhood: response.data.bairro,
        city: response.data.localidade,
        state: response.data.uf,
        complement: '',
        number: '',
      };

      return addressData;
    } catch (err) {
      setError('Erro ao buscar CEP. Tente novamente.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const formatCep = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    const limited = cleaned.substring(0, 8);

    if (limited.length <= 5) {
      return limited;
    } else {
      return `${limited.substring(0, 5)}-${limited.substring(5)}`;
    }
  };

  return {
    searchByCep,
    formatCep,
    loading,
    error,
    clearError: () => setError(''),
  };
};
