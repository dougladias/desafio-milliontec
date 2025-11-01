import { Box, Card, CardContent, Typography } from '@mui/material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

export const StatCard = ({ title, value, icon, color }: StatCardProps) => {
  return (
    <Card
      sx={{
        height: '100%',
        background: '#FFFFFF',
        border: '1px solid #E0E0E0',
        borderRadius: 3,
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.08)',
          borderColor: color,
        },
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            {title}
          </Typography>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: `0 6px 12px ${color}40`,
            }}
          >
            {icon}
          </Box>
        </Box>
        <Typography variant="h4" fontWeight={700} sx={{ color: '#001E27' }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};
