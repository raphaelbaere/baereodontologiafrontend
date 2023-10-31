import React, { useState, useEffect, PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { parseISO, differenceInYears } from 'date-fns';

const COLORS = [
    '#000000', '#0088FE', '#00C49F', '#FFBB28', '#FF8042',
    '#FF5733', '#E63946', '#F1FAEE', '#A8DADC', '#457B9D',
    '#1D3557', '#06D6A0', '#2A9D8F', '#E9C46A', '#F4A261',
    '#8D99AE', '#F2A53F', '#84A59D', '#BEC5AD', '#72B01D'
  ];
const RADIAN = Math.PI / 180;


const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.75;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y}  dx={x > cx ? 28 : -15} dy={x > cx ? 2 : 5} fill="white" textAnchor={x > cx ? 'end' : 'start'} dominantBaseline="central">
        {`${(percent * 100).toFixed(1)}%`} {/* Exibe um dígito decimal */}
      </text>
    );
  };

const Example = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const hoje = Date.now();
        try {

            const response = await fetch(`https://baereodontologiav888-dtkwd4jzea-rj.a.run.app/pagamentos`);
            const paymentData = await response.json();
            
              const paymentCounts = {};

              // Itere sobre os dados dos pacientes
              paymentData.forEach((pagamento) => {
                const paymentType = pagamento.tipo;
            
                // Use o nome do tratamento como chave para o objeto de contagem
                if (paymentCounts[paymentType] === undefined) {
                    paymentCounts[paymentType] = 1; // Se ainda não existe uma contagem para este tratamento, inicie com 1
                } else {
                    paymentCounts[paymentType] += 1; // Se já existe uma contagem, incremente
                }
              });

              const dataArr = Object.entries(paymentCounts).map(([name, value], index) => ({
                name,
                value,
                // Você pode adicionar a lógica de cores aqui, similar à que você usou antes
                fill: COLORS[index],
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
    <ResponsiveContainer width="100%" height={"100%"}>
      <PieChart width={200} height={2000}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Example;