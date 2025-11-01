import type { AddressData } from '../components/AddressInput/types';

/**
 * Converte os dados detalhados de endereço em uma string única
 * para ser enviada ao backend (retrocompatibilidade)
 */
export const formatAddressToString = (address: AddressData): string => {
  const parts: string[] = [];

  if (address.street) {
    let streetPart = address.street;
    if (address.number) {
      streetPart += `, ${address.number}`;
    }
    parts.push(streetPart);
  }

  if (address.complement) {
    parts.push(address.complement);
  }

  if (address.neighborhood) {
    parts.push(address.neighborhood);
  }

  if (address.city && address.state) {
    parts.push(`${address.city} - ${address.state}`);
  } else if (address.city) {
    parts.push(address.city);
  }

  if (address.cep) {
    parts.push(`CEP: ${address.cep}`);
  }

  return parts.join(', ');
};

/**
 * Formata endereço de forma resumida para exibição em tabelas
 * Remove CEP, Cidade e Estado para deixar mais limpo
 */
export const formatAddressForTable = (addressString: string): string => {
  if (!addressString) {
    return 'Não informado';
  }

  // Remove o CEP do endereço
  let cleanAddress = addressString.replace(/,?\s*CEP:?\s*\d{5}-?\d{3}/gi, '');

  // Remove Cidade - Estado do final
  cleanAddress = cleanAddress.replace(/,?\s*[^,]+\s*-\s*[A-Z]{2}\s*$/i, '');

  // Remove vírgulas extras e espaços no final
  cleanAddress = cleanAddress.replace(/,\s*$/, '').trim();

  return cleanAddress || addressString; // Se ficou vazio, retorna o original
};

/**
 * Tenta extrair informações de endereço de uma string
 * para preencher os campos detalhados (ao editar cliente existente)
 * Formato esperado: "Rua, Número, Complemento, Bairro, Cidade - UF, CEP: XXXXX-XXX"
 */
export const parseAddressFromString = (addressString: string): Partial<AddressData> => {
  if (!addressString) {
    return {};
  }

  const result: Partial<AddressData> = {};

  // Remove o CEP do endereço e guarda
  const cepMatch = addressString.match(/CEP:?\s*(\d{5}-?\d{3})/i);
  if (cepMatch) {
    result.cep = cepMatch[1].replace(/\D/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
  }
  // Remove CEP da string para facilitar o parse do resto
  let remainingAddress = addressString.replace(/,?\s*CEP:?\s*\d{5}-?\d{3}/gi, '').trim();

  // Extrai cidade e estado (padrão: Cidade - UF no final)
  const cityStateMatch = remainingAddress.match(/([^,]+)\s*-\s*([A-Z]{2})\s*$/);
  if (cityStateMatch) {
    result.city = cityStateMatch[1].trim();
    result.state = cityStateMatch[2].trim();
    // Remove cidade e estado da string
    remainingAddress = remainingAddress.replace(/,?\s*[^,]+\s*-\s*[A-Z]{2}\s*$/, '').trim();
  }

  // Agora temos algo como: "Rua, Número, Complemento, Bairro"
  // Separa por vírgulas
  const parts = remainingAddress.split(',').map(p => p.trim()).filter(p => p);

  if (parts.length > 0) {
    // Primeiro elemento: Rua (e possivelmente número junto)
    const firstPart = parts[0];

    // Verifica se o segundo elemento é um número (caso seja: "Rua Nome", "123", ...)
    if (parts.length > 1 && /^\d+/.test(parts[1])) {
      result.street = firstPart;
      result.number = parts[1];

      // Os elementos restantes podem ser complemento e bairro
      if (parts.length > 2) {
        // Se temos 4+ partes: Rua, Número, Complemento, Bairro
        if (parts.length >= 4) {
          result.complement = parts[2];
          result.neighborhood = parts[3];
        }
        // Se temos 3 partes: Rua, Número, Bairro (sem complemento)
        else if (parts.length === 3) {
          result.neighborhood = parts[2];
        }
      }
    } else {
      // Formato sem número separado
      // Pode ser: ["Rua Nome 123", "Complemento", "Bairro"]
      // ou: ["Rua Nome", "Bairro"]
      result.street = firstPart;

      if (parts.length === 3) {
        result.complement = parts[1];
        result.neighborhood = parts[2];
      } else if (parts.length === 2) {
        result.neighborhood = parts[1];
      }
    }
  }

  return result;
};

/**
 * Valida se o endereço tem informações mínimas necessárias
 */
export const isValidAddress = (address: AddressData): boolean => {
  // Pelo menos deve ter rua OU CEP
  return !!(address.street || address.cep);
};
