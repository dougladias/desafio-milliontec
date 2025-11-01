import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Client } from '../types';
import logo from '../assets/logo_milliontech.webp';

// Função para converter WebP para PNG usando Canvas
const convertWebPToPNG = (webpUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      } else {
        reject(new Error('Não foi possível obter contexto do canvas'));
      }
    };
    img.onerror = () => reject(new Error('Erro ao carregar imagem'));
    img.src = webpUrl;
  });
};

export const generateClientsPDF = async (clients: Client[]) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Cabeçalho com fundo azul
  doc.setFillColor(0, 30, 39); // Cor #001E27
  doc.rect(0, 0, pageWidth, 45, 'F');

  // Logo da empresa (pequena, no canto esquerdo)
  try {
    const logoPNG = await convertWebPToPNG(logo);
    doc.addImage(logoPNG, 'PNG', 14, 12, 35, 20);
  } catch (error) {
    console.error('Erro ao adicionar logo ao PDF:', error);
  }

  // Título
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('LISTA DE CLIENTES', pageWidth / 2, 20, { align: 'center' });

  // Subtítulo
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  const date = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const time = new Date().toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });
  doc.text(`Relatório gerado em ${date} às ${time}`, pageWidth / 2, 30, {
    align: 'center',
  });

  // Info adicional
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.text(`Total de clientes: ${clients.length}`, pageWidth / 2, 38, {
    align: 'center',
  });

  // Tabela
  autoTable(doc, {
    head: [['#', 'Nome', 'E-mail', 'Telefone', 'Endereço']],
    body: clients.map((client, index) => [
      index + 1,
      client.name,
      client.email,
      client.phone,
      client.address,
    ]),
    startY: 52,
    theme: 'striped',
    headStyles: {
      fillColor: [0, 30, 39], 
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 11,
      halign: 'center',
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
      lineColor: [220, 220, 220],
      lineWidth: 0.1,
    },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 38 },
      2: { cellWidth: 48 },
      3: { cellWidth: 32, halign: 'center' },
      4: { cellWidth: 55 },
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250], 
    },
  });

  // Rodapé
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(
      `Página ${i} de ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
    doc.text(
      'Sistema de Gestão de Clientes - Million Tech',
      pageWidth / 2,
      doc.internal.pageSize.height - 6,
      { align: 'center' }
    );
  }

  // Salvar o PDF
  const fileName = `clientes_${new Date()
    .toLocaleDateString('pt-BR')
    .replace(/\//g, '-')}.pdf`;
  doc.save(fileName);
};
