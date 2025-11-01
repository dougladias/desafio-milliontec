import { Button, CircularProgress } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';

interface FormButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

export const FormButton = ({
  loading = false,
  loadingText,
  children,
  ...props
}: FormButtonProps) => {
  return (
    <Button
      {...props}
      fullWidth
      variant="contained"
      disabled={loading || props.disabled}
      sx={{
        mt: 4,
        mb: 2,
        height: 52,
        bgcolor: '#001E27',
        color: '#FFFFFF',
        borderRadius: 2,
        fontSize: '1rem',
        fontWeight: 600,
        textTransform: 'none',
        boxShadow: '0 4px 12px rgba(0, 30, 39, 0.3)',
        '&:hover': {
          bgcolor: '#003440',
          boxShadow: '0 6px 16px rgba(0, 30, 39, 0.4)',
        },
        '&:disabled': {
          bgcolor: '#003440',
          opacity: 0.7,
        },
        ...props.sx,
      }}
    >
      {loading ? (
        <>
          <CircularProgress size={24} color="inherit" sx={{ mr: loadingText ? 1 : 0 }} />
          {loadingText}
        </>
      ) : (
        children
      )}
    </Button>
  );
};
