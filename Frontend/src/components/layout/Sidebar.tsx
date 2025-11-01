import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, IconButton, Tooltip } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const SIDEBAR_WIDTH = 280;
export const SIDEBAR_COLLAPSED_WIDTH = 80;

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Clientes', icon: <PeopleIcon />, path: '/clients' },
  ];

  return (
    <Box
      sx={{
        width: isOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
        height: '100vh',
        bgcolor: '#000303',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        boxShadow: '4px 0 12px rgba(0, 0, 0, 0.1)',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
      }}
    >
      {/* Logo/Título */}
      <Box sx={{ p: 3, position: 'relative', minHeight: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isOpen ? (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <Box sx={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="h5" fontWeight={700} sx={{ color: '#00D9C0', whiteSpace: 'nowrap' }}>
                MillionTech
              </Typography>
              <Typography variant="body2" sx={{ color: '#B0B0B0', mt: 0.5, whiteSpace: 'nowrap' }}>
                Sistema de Clientes
              </Typography>
            </Box>

            <IconButton
              onClick={() => setIsOpen(!isOpen)}
              sx={{
                color: '#00D9C0',
                '&:hover': {
                  bgcolor: '#003440',
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Box>
        ) : (
          <IconButton
            onClick={() => setIsOpen(!isOpen)}
            sx={{
              color: '#00D9C0',
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ bgcolor: '#003440', mx: 2 }} />

      {/* Menu Items */}
      <List sx={{ flex: 1, px: 2, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <Tooltip
              title={item.text}
              placement="right"
              disableHoverListener={isOpen}
              arrow
              slotProps={{
                tooltip: {
                  sx: {
                    bgcolor: '#00D9C0',
                    color: '#000303',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    py: 1,
                    px: 2,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0, 217, 192, 0.4)',
                  },
                },
                arrow: {
                  sx: {
                    color: '#00D9C0',
                  },
                },
              }}
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  bgcolor: location.pathname === item.path ? '#003440' : 'transparent',
                  '&:hover': {
                    bgcolor: location.pathname === item.path ? '#003440' : '#00273A',
                  },
                  borderLeft: location.pathname === item.path ? '4px solid #00D9C0' : '4px solid transparent',
                  pl: 2,
                  justifyContent: isOpen ? 'flex-start' : 'center',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? '#00D9C0' : '#B0B0B0',
                    minWidth: isOpen ? 40 : 0,
                    justifyContent: 'center',
                    transition: 'min-width 0.3s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    whiteSpace: 'nowrap',
                    '& .MuiTypography-root': {
                      fontWeight: location.pathname === item.path ? 600 : 400,
                      color: location.pathname === item.path ? '#FFFFFF' : '#B0B0B0',
                    },
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: '#003440', mx: 2 }} />

      {/* Logout */}
      <Box sx={{ p: 2 }}>
        <Tooltip
          title="Sair"
          placement="right"
          disableHoverListener={isOpen}
          arrow
          slotProps={{
            tooltip: {
              sx: {
                bgcolor: '#F5A623',
                color: '#000303',
                fontWeight: 600,
                fontSize: '0.875rem',
                py: 1,
                px: 2,
                borderRadius: 2,
                boxShadow: '0 4px 12px rgba(245, 166, 35, 0.4)',
              },
            },
            arrow: {
              sx: {
                color: '#F5A623',
              },
            },
          }}
        >
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              '&:hover': {
                bgcolor: '#003440',
              },
              justifyContent: isOpen ? 'flex-start' : 'center',
            }}
          >
            <ListItemIcon
              sx={{
                color: '#F5A623',
                minWidth: isOpen ? 40 : 0,
                justifyContent: 'center',
                transition: 'min-width 0.3s ease',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Sair"
              sx={{
                opacity: isOpen ? 1 : 0,
                transition: 'opacity 0.2s ease',
                whiteSpace: 'nowrap',
                '& .MuiTypography-root': {
                  color: '#F5A623',
                  fontWeight: 500,
                },
              }}
            />
          </ListItemButton>
        </Tooltip>
      </Box>
    </Box>
  );
};
