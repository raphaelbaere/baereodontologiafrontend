import * as React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [data, setData] = React.useState([]);
  const { urlRequisicao } = React.useContext(BaereContext);
  
  const getDate = () => {
    const dataString = data.data;
    const correctMonthDate = new Date(dataString);
    const dia = correctMonthDate.getUTCDate();
    const mes = correctMonthDate.toLocaleString('pt-BR', { month: 'long' });
    const ano = correctMonthDate.getUTCFullYear();
    
    const dataFormatada = `${dia} de ${mes} de ${ano}`;
    return dataFormatada;
  }

  React.useEffect(() => {
    const fetchData = async () => {
      const hoje = new Date();
      try {

      const response = await fetch(`${urlRequisicao}/pagamentos`);
      const paymentData = await response.json();

        setData(paymentData[paymentData.length - 1]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, []);
  return (
    <React.Fragment>
      <Title>Último pagamento</Title>
      <Typography sx={{ marginTop: '35px'}} component="p" variant="h4">
        R${data.pagou},00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {getDate()}
      </Typography>
      <div>
        <Link to="/pagamentos" color="primary">
          Ver mais...
        </Link>
      </div>
    </React.Fragment>
  );
}