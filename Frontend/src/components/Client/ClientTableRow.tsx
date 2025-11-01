import { TableCell, TableRow, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Client } from '../../types';
import { formatAddressForTable } from '../../utils/addressHelpers';

interface ClientTableRowProps {
  client: Client;
  index: number;
  isMobile: boolean;
  onView: (client: Client) => void;
  onEdit: (id: number) => void;
  onDelete: (client: Client) => void;
}

export const ClientTableRow = ({
  client,
  index,
  isMobile,
  onView,
  onEdit,
  onDelete,
}: ClientTableRowProps) => {
  return (
    <TableRow
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        '&:hover': {
          bgcolor: '#F5F7FA',
        },
      }}
    >
      <TableCell
        sx={{
          fontWeight: 600,
          color: '#666',
          display: isMobile ? 'none' : 'table-cell',
        }}
      >
        {index + 1}
      </TableCell>
      <TableCell sx={{ fontWeight: 600, color: '#001E27' }}>
        {client.name}
      </TableCell>
      <TableCell
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: isMobile ? 'nowrap' : 'normal',
          maxWidth: isMobile ? '200px' : 'none',
        }}
      >
        {client.email}
      </TableCell>
      <TableCell>{client.phone}</TableCell>
      <TableCell
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: isMobile ? 'nowrap' : 'normal',
          maxWidth: isMobile ? '200px' : 'none',
        }}
      >
        {formatAddressForTable(client.address)}
      </TableCell>
      <TableCell align="center">
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
          <IconButton
            onClick={() => onView(client)}
            size="small"
            sx={{
              color: '#1976d2',
              '&:hover': {
                bgcolor: '#1976d220',
              },
            }}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            onClick={() => onEdit(client.id)}
            size="small"
            sx={{
              color: '#00D9C0',
              '&:hover': {
                bgcolor: '#00D9C020',
              },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => onDelete(client)}
            size="small"
            sx={{
              color: '#d32f2f',
              '&:hover': {
                bgcolor: '#d32f2f20',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};
