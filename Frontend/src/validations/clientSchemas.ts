import * as yup from 'yup';

export const clientSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('E-mail inválido')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'E-mail deve ter um domínio válido (ex: usuario@exemplo.com)'
    ),
  phone: yup
    .string()
    .required('Telefone é obrigatório')
    .test('phone-length', 'Telefone deve ter pelo menos 10 dígitos', (value) => {
      if (!value) return false;
      const cleaned = value.replace(/\D/g, '');
      return cleaned.length >= 10;
    }),
  // address continua obrigatório para retrocompatibilidade
  // mas será preenchido automaticamente pelo AddressInput
  address: yup.string().notRequired(),
});
