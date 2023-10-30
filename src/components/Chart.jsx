import React, { useEffect, useState } from 'react';
import '../styles/recharts.css'
import {
  BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';
import Title from './Title';
import { Typography } from '@mui/material';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ border: 'none', boxShadow: 'none', backgroundColor: 'white', color: 'black' }}>
          <p><strong>Dia:</strong> {payload[0].payload.name}</p>
          <p><strong>Montante:</strong> R${payload[0].value},00</p>
        </div>
      );
    }
    return null;
  };

  const getDayWeek = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1); // Obtém o primeiro dia da semana (domingo)
    
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 4); // Obtém o último dia da semana (sábado);

    return `Rendimento semanal (${firstDayOfWeek.toLocaleDateString('pt-BR')} à ${lastDayOfWeek.toLocaleDateString('pt-BR')})`
  }

const Example = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const hoje = Date.now();
        try {
          const response = await fetch(`https://baereodontologiav888-dtkwd4jzea-rj.a.run.app/pagamentos`);
          const paymentData = await response.json();
          
          const today = new Date();
          const firstDayOfWeek = new Date(today);
          firstDayOfWeek.setDate(today.getDate() - today.getDay()); // Obtém o primeiro dia da semana (domingo)
          
          const lastDayOfWeek = new Date(firstDayOfWeek);
          lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6); // Obtém o último dia da semana (sábado)
          const dayNames = [
            'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
          ];
          
          const colors = [
            '#FF5733', '#33FF57', '#5733FF', '#FF33F1', '#33FFFF', '#FF3333'
          ];
          
          // Crie um objeto para rastrear os pagamentos por dia da semana
          const paymentCounts = {};

          // Inicialize o objeto com valores zero para todos os dias da semana
          for (let i = 1; i < 7; i++) {
            paymentCounts[i] = 0;
          }
          
          paymentData.forEach((payment) => {
            const isoDate = new Date(payment.data);
            if (isoDate >= firstDayOfWeek && isoDate <= lastDayOfWeek) {
              console.log(payment);
              const day = isoDate.getUTCDay();
              if (paymentCounts[day] === undefined) {
                paymentCounts[day] = payment.pagou;
              } else {
                paymentCounts[day] += payment.pagou;
              }
            }
          });
          
          const dataArr = Object.entries(paymentCounts).map(([day, value], index) => ({
            name: dayNames[day],
            value,
            fill: colors[index],
          }));
          
          
            
      
          // Processar os dados para contar o número de pacientes em cada bairro

  
          // Definir os dados no estado
          setData(dataArr);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, []);
  return (
<>
<Typography component="h2" variant="h5" color="primary" gutterBottom>
    {getDayWeek()}
</Typography>
<ResponsiveContainer width="100%" height="100%">
  <BarChart
    width={"100%"}
    height={"100%"}
    data={data}
    margin={{
      top: 40,
      right: 25,
      left: -10,
      bottom: 45, // Aumente a margem inferior para acomodar rótulos na vertical
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" dx={50} tickLine={{ transform: 'translate(54, 0)' }}  angle={-90} textAnchor="end" interval={0} tick={{ fontSize: 14 }} scale="band" />
    <YAxis />
    <Tooltip content={<CustomTooltip />} />
    <Bar dataKey="value" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
  </BarChart>
</ResponsiveContainer>
</>
  );
};

export default Example;
