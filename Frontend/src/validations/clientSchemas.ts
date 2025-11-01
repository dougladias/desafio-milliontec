import * as yup from 'yup';

export const clientSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('E-mail inválido'),
  phone: yup
    .string()
    .required('Telefone é obrigatório')
    .test('phone-length', 'Telefone deve ter pelo menos 10 dígitos', (value) => {
      if (!value) return false;
      const cleaned = value.replace(/\D/g, '');
      return cleaned.length >= 10;
    }),
  address: yup.string().required('Endereço é obrigatório'),
});
