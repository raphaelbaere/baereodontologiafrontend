import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Últimos pagamentos</Title>
      <Typography component="p" variant="h4">
        R$0,00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        15 de Março, 2023
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver o balanço
        </Link>
      </div>
    </React.Fragment>
  );
}