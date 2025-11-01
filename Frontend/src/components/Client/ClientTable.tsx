import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import type { Client } from '../../types';
import { ClientTableRow } from './ClientTableRow';

interface ClientTableProps {
  clients: Client[];
  onView: (client: Client) => void;
  onEdit: (id: number) => void;
  onDelete: (client: Client) => void;
}

export const ClientTable = ({ clients, onView, onEdit, onDelete }: ClientTableProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 1,
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <Table sx={{ minWidth: isMobile ? 650 : 'auto' }}>
        <TableHead>
          <TableRow sx={{ bgcolor: '#F5F7FA' }}>
            <TableCell
              sx={{
                fontWeight: 700,
                color: '#001E27',
                width: '60px',
                display: isMobile ? 'none' : 'table-cell',
              }}
            >
              #
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                color: '#001E27',
                minWidth: isMobile ? '150px' : 'auto',
              }}
            >
              Nome
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                color: '#001E27',
                minWidth: isMobile ? '200px' : 'auto',
              }}
            >
              E-mail
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                color: '#001E27',
                minWidth: isMobile ? '130px' : 'auto',
              }}
            >
              Telefone
            </TableCell>
            <TableCell
              sx={{
                fontWeight: 700,
                color: '#001E27',
                minWidth: isMobile ? '200px' : 'auto',
              }}
            >
              Endereço
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: 700, color: '#001E27', width: '80px' }}
            >
              Ações
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map((client, index) => (
            <ClientTableRow
              key={client.id}
              client={client}
              index={index}
              isMobile={isMobile}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
