import * as React from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Button, Typography } from '@mui/material';
import { format } from 'date-fns';
import { BaereContext } from '../context/BaereProvider';

// Generate Order Data
function createData(data, paciente, tratamento, doutor, dente, valor, realizado, acrescimo, desconto) {
  return { data, paciente, tratamento, doutor, dente, valor, realizado, acrescimo, desconto };
}

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [rows, setRows] = React.useState([]);
  const { urlRequisicao } = React.useContext(BaereContext);
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${urlRequisicao}/tratamentos`);
      const treatmentData = await response.json();
      const lastTreament = treatmentData[treatmentData.length - 1];
      console.log(lastTreament)
      setRows([createData(
        lastTreament.data,
        lastTreament.paciente.nome,
        lastTreament.tratamento.nome,
        lastTreament.doutores.nome,
        lastTreament.dente,
        lastTreament.valor,
        lastTreament.realizado,
        lastTreament.acrescimo,
        lastTreament.desconto,
      )]);
    }
    fetchData()
  }, [])
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
            <TableCell>Data</TableCell>
            <TableCell>Paciente</TableCell>
            <TableCell>Tratamento</TableCell>
            <TableCell>Doutor(a)</TableCell>
            <TableCell>Dente</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Realizado</TableCell>
            <TableCell>Acrescimo</TableCell>
            <TableCell>Desconto</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => {
            const date = new Date(row.data);
            return (
            <TableRow key={row.id}>
              <TableCell>{format(date.setDate(date.getDate() + 1), 'dd/MM/yyyy')}</TableCell>
              <TableCell>{row.paciente}</TableCell>
              <TableCell>{row.tratamento}</TableCell>
              <TableCell>{row.doutor}</TableCell>
              <TableCell>{row.dente}</TableCell>
              <TableCell>{row.valor}</TableCell>
              <TableCell>{row.realizado}</TableCell>
              <TableCell>{row.acrescimo}</TableCell>
              <TableCell>{row.desconto}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
      <Link color="primary" to="/atendimentos" style={{ marginTop: '15px'}}>
        Ver mais...
      </Link>
    </React.Fragment>
  );
}