import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Snackbar, Alert, IconButton } from '@mui/material';
import { Person, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../contexts/AuthContext';
import type { LoginDTO } from '../../types';
import { FormInput, FormButton } from '../forms';
import { loginSchema } from '../../validations';
import { AuthCard } from './AuthCard';

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [openErrorToast, setOpenErrorToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginDTO) => {
    setLoading(true);
    setError('');
    setSuccess('');
    setOpenErrorToast(false);

    try {
      await login(data);
      setSuccess('Login realizado com sucesso!');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      const errorMessage = err instanceof Error && 'response' in err
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : 'Erro ao fazer login. Verifique suas credenciais.';
      setError(errorMessage || 'Erro ao fazer login. Verifique suas credenciais.');
      setOpenErrorToast(true);
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          register={register('username')}
          label="Usuário"
          autoComplete="username"
          autoFocus
          error={errors.username?.message}
          disabled={loading}
          startIcon={<Person />}
        />

        <FormInput
          register={register('password')}
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          error={errors.password?.message}
          disabled={loading}
          startIcon={<Lock />}
          endIcon={
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
              tabIndex={-1}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />

        <FormButton type="submit" loading={loading}>
          Entrar
        </FormButton>
      </Box>

      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success" onClose={() => setSuccess('')}>
          {success}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorToast}
        autoHideDuration={4000}
        onClose={() => setOpenErrorToast(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" onClose={() => setOpenErrorToast(false)}>
          {error}
        </Alert>
      </Snackbar>
    </AuthCard>
  );
};
