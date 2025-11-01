import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Client } from '../types';

export const generateClientsPDF = (clients: Client[]) => {
  const doc = new jsPDF();

  // Título
  doc.setFontSize(18);
  doc.text('Lista de Clientes', 14, 22);

  // Data de geração
  doc.setFontSize(10);
  const date = new Date().toLocaleDateString('pt-BR');
  doc.text(`Gerado em: ${date}`, 14, 30);

  // Tabela
  autoTable(doc, {
    head: [['ID', 'Nome', 'E-mail', 'Telefone', 'Endereço']],
    body: clients.map((client) => [
      client.id,
      client.name,
      client.email,
      client.phone,
      client.address,
    ]),
    startY: 35,
    theme: 'grid',
    headStyles: {
      fillColor: [25, 118, 210],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 10,
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 15 },
      1: { cellWidth: 40 },
      2: { cellWidth: 50 },
      3: { cellWidth: 35 },
      4: { cellWidth: 45 },
    },
  });

  // Salvar o PDF
  doc.save(`clientes_${date.replace(/\//g, '-')}.pdf`);
};
