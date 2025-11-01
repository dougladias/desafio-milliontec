import { useState, useEffect } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar, SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  // Fecha o sidebar automaticamente quando mudar para mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#FFFFFF' }}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Botão de menu flutuante apenas em mobile */}
      {isMobile && !sidebarOpen && (
        <IconButton
          onClick={() => setSidebarOpen(true)}
          sx={{
            position: 'fixed',
            top: 16,
            left: 16,
            zIndex: 1200,
            bgcolor: '#000303',
            color: '#00D9C0',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            '&:hover': {
              bgcolor: '#003440',
            },
          }}
        >
          <MenuIcon />
        </IconButton>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          p: isMobile ? 2 : 4,
          pt: isMobile ? 8 : 4, // Padding top maior em mobile para não sobrepor o botão hamburger
          marginLeft: isMobile ? 0 : (sidebarOpen ? `${SIDEBAR_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`),
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
