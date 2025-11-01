import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps extends Omit<TextFieldProps, 'error' | 'helperText'> {
  register: UseFormRegisterReturn;
  error?: string;
}

export const FormInput = ({ register, error, ...props }: FormInputProps) => {
  return (
    <TextField
      {...register}
      {...props}
      error={!!error}
      helperText={error}
      fullWidth
      margin="normal"
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: 2,
        },
        ...props.sx,
      }}
    />
  );
};
