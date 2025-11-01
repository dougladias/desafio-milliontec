import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Usuário é obrigatório')
    .min(3, 'Usuário deve ter pelo menos 3 caracteres'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(3, 'Senha deve ter pelo menos 3 caracteres'),
});

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required('Usuário é obrigatório')
    .min(3, 'Usuário deve ter pelo menos 3 caracteres'),
  email: yup
    .string()
    .required('E-mail é obrigatório')
    .email('E-mail inválido'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres'),
  confirmPassword: yup
    .string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([yup.ref('password')], 'As senhas não coincidem'),
});
