import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button, Typography } from '@mui/material';

// Generate Order Data
function createData(id, nome, data, tratamento, doutor, valor, link) {
  return { id, nome, data, tratamento, doutor, valor, link };
}

const rows = [
  createData(
    0,
    'Raphael Baere',
    '14 de Abril de 2023',
    'Limpeza',
    'Renan Baere',
    80.00,
    'https://drrenanbaere.com.br/ficha/1'
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
        <div id="title">
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Atendimentos recentes
        </Typography>
        <Button>
            Adicionar novo paciente
        </Button>
        </div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Tratamento</TableCell>
            <TableCell>Doutor</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Link para ficha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.nome}</TableCell>
              <TableCell>{row.data}</TableCell>
              <TableCell>{row.tratamento}</TableCell>
              <TableCell>{row.doutor}</TableCell>
              <TableCell>{`R$${row.valor}`}</TableCell>
              <TableCell>
                <Link
                href="#">
                {`${row.link}`}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        Ver mais pacientes
      </Link>
    </React.Fragment>
  );
}