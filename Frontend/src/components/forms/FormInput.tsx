import { TextField, InputAdornment } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import type { UseFormRegisterReturn } from 'react-hook-form';
import type { ReactNode } from 'react';

interface FormInputProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
  register: UseFormRegisterReturn;
  error?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export const FormInput = ({ register, error, startIcon, endIcon, ...props }: FormInputProps) => {
  return (
    <TextField
      {...register}
      {...props}
      error={!!error}
      helperText={error}
      fullWidth
      margin="normal"
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : undefined,
        endAdornment: endIcon ? (
          <InputAdornment position="end">{endIcon}</InputAdornment>
        ) : undefined,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
        ...props.sx,
      }}
    />
  );
};
