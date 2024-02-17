import React, { useEffect, useState } from 'react';
import '../styles/recharts.css'
import {
  BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ border: 'none', boxShadow: 'none', backgroundColor: 'white', color: 'black' }}>
          <p><strong>Mês:</strong> {payload[0].payload.name}</p>
          <p><strong>Quantidade de atendimentos:</strong> {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

const Example = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const hoje = Date.now();
        try {
            const patientCounts = {};

            const response = await fetch(`https://extbaereodontoserver2026-dtkwd4jzea-rj.a.run.app/tratamentos`);
            const treatmentData = await response.json();
            const treatmenteDataFiltered = treatmentData.filter((treatmentRows) => treatmentRows.realizado === 'Sim');

            const monthNames = [
                'Janeiro', 'Fevereiro', 'Março', 'Abril',
                'Maio', 'Junho', 'Julho', 'Agosto',
                'Setembro', 'Outubro', 'Novembro', 'Dezembro',
              ];
              
              const colors = [
                '#FF5733', '#33FF57', '#5733FF', '#33FFFA', '#FF33F1',
                '#33F1FF', '#33FF33', '#FF3333', '#33FFFF', '#FFFF33',
                '#33F6FF', '#FF33A6', '#33A6FF', '#F6FF33', '#FF6E33',
                '#6E33FF', '#6EFF33', '#F633FF', '#F6336E', '#6FF633',
                '#336EFF', '#F36E33', '#336EF3', '#336EF3', '#F3336E',
                '#6EF333', '#F33F6E',
              ];

              treatmenteDataFiltered.forEach((patient) => {
                const isoDate = new Date(patient.data); // Converta a data ISO em um objeto Date
                const month = isoDate.getMonth(); // Obtenha o mês (0 a 11)
            
                // Use o mês como chave para o objeto de contagem
                if (month === 11) {
                }
                if (patientCounts[month] === undefined) {
                  patientCounts[month] = 1; // Se ainda não existe uma contagem para este mês, inicie com 1
                } else {
                  patientCounts[month] += 1; // Se já existe uma contagem, incremente
                }
              });

              const dataArr = Object.entries(patientCounts).map(([month, value], index) => ({
                name: monthNames[month], // Use o array de nomes dos meses
                value,
                // Você pode adicionar a lógica de cores aqui, similar à que você usou antes
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
<ResponsiveContainer width="100%" height="100%">
  <BarChart
    width={500}
    height={400}
    data={data}
    margin={{
      top: 5,
      right: 30,
      left: 20,
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
  );
};

export default Example;
