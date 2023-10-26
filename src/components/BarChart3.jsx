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
          <p><strong>Montante arrendado:</strong> R${payload[0].value}</p>
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
            const paymentCounts = {};

            const response = await fetch(`https://baereodontologiav888-dtkwd4jzea-rj.a.run.app/pagamentos`);
            const paymentData = await response.json();

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

              paymentData.forEach((payment) => {
                const isoDate = new Date(payment.data); // Converta a data ISO em um objeto Date
                const month = isoDate.getMonth(); // Obtenha o mês (0 a 11)
            
                // Use o mês como chave para o objeto de contagem
                if (paymentCounts[month] === undefined) {
                    paymentCounts[month] = payment.pagou; // Se ainda não existe uma contagem para este mês, inicie com 1
                } else {
                    paymentCounts[month] += payment.pagou; // Se já existe uma contagem, incremente
                }
              });

              const dataArr = Object.entries(paymentCounts).map(([month, value], index) => ({
                name: monthNames[month], // Use o array de nomes dos meses
                value,
                // Você pode adicionar a lógica de cores aqui, similar à que você usou antes
                fill: colors[index],
              }));
            
      
          // Processar os dados para contar o número de pacientes em cada bairro

  
          // Definir os dados no estado
          console.log(dataArr)
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
    <XAxis dataKey="name"  angle={-90} textAnchor="end" interval={0} tickLine={{ transform: 'translate(28, 0)' }} tick={{ fontSize: 10, dx: 25}} scale="band" />
    <YAxis />
    <Tooltip content={<CustomTooltip />} />
    <Bar dataKey="value" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
  </BarChart>
</ResponsiveContainer>
  );
};

export default Example;
