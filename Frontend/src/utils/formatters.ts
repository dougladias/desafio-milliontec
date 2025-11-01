// Formata telefone em tempo real enquanto digita: (99) 99999-9999
export const formatPhoneInput = (value: string): string => {
  if (!value) return '';

  // Remove tudo que não é número
  const cleaned = value.replace(/\D/g, '');

  // Limita a 11 dígitos
  const limited = cleaned.substring(0, 11);

  // Aplica a máscara progressivamente
  if (limited.length <= 2) {
    return limited;
  } else if (limited.length <= 7) {
    return `(${limited.substring(0, 2)}) ${limited.substring(2)}`;
  } else {
    return `(${limited.substring(0, 2)}) ${limited.substring(2, 7)}-${limited.substring(7)}`;
  }
};

// Formata telefone completo: (99) 99999-9999
export const formatPhone = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return value;
};

// Remove formatação do telefone
export const unformatPhone = (value: string): string => {
  return value.replace(/\D/g, '');
};
