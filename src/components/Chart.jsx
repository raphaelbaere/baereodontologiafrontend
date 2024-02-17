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
          <p><strong>Rendimento Bruto:</strong> R${payload[0].payload.bruto},00</p>
          <p><strong>Rendimento Líquido:</strong> R${payload[0].payload.lucro},00</p>
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
          const response = await fetch(`https://extbaereodontoserver2026-dtkwd4jzea-rj.a.run.app/pagamentos`);
          const paymentData = await response.json();

          const treatment = await fetch(`https://extbaereodontoserver2026-dtkwd4jzea-rj.a.run.app/tratamentos`);
          const treatmentData = await treatment.json();
          const treatmentDataFiltered = treatmentData.filter((eachTreatment) => eachTreatment.realizado === 'Sim');

          
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
            paymentCounts[i] = {
              bruto: 0,
              desconto: 0,
            };
          }
          
          paymentData.forEach((payment) => {
            const isoDate = new Date(payment.data);
            if (isoDate >= firstDayOfWeek && isoDate <= lastDayOfWeek) {
              const day = isoDate.getUTCDay();
              if (paymentCounts[day] === undefined) {
                paymentCounts[month] = {
                  bruto: payment.pagou,
                };
              } else {
                paymentCounts[day].bruto += payment.pagou;
              }
            }
          });
          
          treatmentDataFiltered.forEach((treatment) => {
            const isoDate = new Date(treatment.data);
            if (isoDate >= firstDayOfWeek && isoDate <= lastDayOfWeek) {
              const day = isoDate.getUTCDay();
              if (paymentCounts[day].desconto === undefined) {
                paymentCounts[day].desconto = treatment.desconto;
              } else {
                console.log(treatment.desconto)
                paymentCounts[day].desconto += treatment.desconto;
              }
            }
          });
          
          const dataArr = Object.entries(paymentCounts).map(([day, values], index) => ({
            name: dayNames[day], // Use o array de nomes dos meses
            bruto: values.bruto,
            lucro: values.bruto - values.desconto,
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
      left: 10,
      bottom: 45, // Aumente a margem inferior para acomodar rótulos na vertical
    }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" dx={50} tickLine={{ transform: 'translate(54, 0)' }}  angle={-90} textAnchor="end" interval={0} tick={{ fontSize: 14 }} scale="band" />
    <YAxis tickFormatter={(value) => `R$${value}`}/>
    <Tooltip content={<CustomTooltip />} />
    <Bar dataKey="bruto" fill="#82ca9d" name="Montante Arrendado" />
    <Bar dataKey="lucro" fill="#8884d8" name="Lucro Líquido" fillOpacity={0.6} />
  </BarChart>
</ResponsiveContainer>
</>
  );
};

export default Example;
