import React, { useEffect, useState } from 'react';
import '../styles/recharts.css'
import {
  BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label
} from 'recharts';
import { BaereContext } from '../context/BaereProvider';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ border: 'none', boxShadow: 'none', backgroundColor: 'white', color: 'black' }}>
          <p><strong>Bairro:</strong> {payload[0].payload.name}</p>
          <p><strong>Quantidade de pacientes:</strong> {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

const Example = () => {
    const [data, setData] = useState([]);
    const { urlRequisicao } = React.useContext(BaereContext);
    useEffect(() => {
      const fetchData = async () => {
        const hoje = Date.now();
        try {
          const response = await fetch(`${urlRequisicao}/pacientes`);
          const locationData = await response.json();
  
          // Processar os dados para contar o número de pacientes em cada bairro
          const bairroCounts = {};
          locationData.forEach(paciente => {
            const bairro = paciente.endereco.bairro;
            bairroCounts[bairro] = (bairroCounts[bairro] || 0) + 1;
          });

          const colors = [
            '#FF5733', '#33FF57', '#5733FF', '#33FFFA', '#FF33F1',
            '#33F1FF', '#33FF33', '#FF3333', '#33FFFF', '#FFFF33',
            '#33F6FF', '#FF33A6', '#33A6FF', '#F6FF33', '#FF6E33',
            '#6E33FF', '#6EFF33', '#F633FF', '#F6336E', '#6FF633',
            '#336EFF', '#F36E33', '#336EF3', '#336EF3', '#F3336E',
            '#6EF333', '#F33F6E',
          ];
  
          // Converter os dados processados em um array de objetos
          const dataArr = Object.entries(bairroCounts).map(([name, value], index) => ({
            name,
            value,
            fill: colors[index],
          }));
  
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
    <XAxis dx={7} dataKey="name"  angle={-90} tickLine={{ transform: 'translate(11, 0)' }} textAnchor="end" interval={0} tick={{ fontSize: 10 }} scale="band" />
    <YAxis />
    <Tooltip content={<CustomTooltip />} />
    <Bar dataKey="value" fill="#82ca9d"  activeBar={false} />
  </BarChart>
</ResponsiveContainer>
  );
};

export default Example;
