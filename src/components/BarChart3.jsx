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
          <p><strong>Mês:</strong> {payload[0].payload.name}</p>
          <p><strong>Rendimento Bruto:</strong> R${payload[0].payload.bruto}</p>
        </div>
      );
    }
    return null;
  };

const Example = ({ setAtualiza, filtroAno }) => {
    const [data, setData] = useState([]);
    console.log(filtroAno)
    const { urlRequisicao } = React.useContext(BaereContext);
    useEffect(() => {
      const fetchData = async () => {
        const hoje = Date.now();
        try {
          const paymentCounts = {};
    
          // Fetch de pagamentos
          const response = await fetch(`${urlRequisicao}/pagamentos`);
          const paymentDataUnfiltered = await response.json();
    
          // Filtrar os pagamentos pelo filtro de ano
          const paymentData = paymentDataUnfiltered.filter(payment => {
            const isoDate = new Date(payment.data);
            return isoDate.getFullYear() === filtroAno;
          });
    
          // Fetch de tratamentos realizados
          const treatmentResponse = await fetch(`${urlRequisicao}/tratamentos`);
          const treatmentData = await treatmentResponse.json();
          const treatmentDataFiltered = treatmentData.filter(treatment => treatment.realizado === 'Sim');
    
          // Arrays para mês e cores
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
    
          // Contagem de pagamentos brutos por mês
          paymentData.forEach(payment => {
            const isoDate = new Date(payment.data);
            isoDate.setDate(isoDate.getDate() + 1);
            const month = isoDate.getMonth(); // Adicionar +1 para ajustar o mês
          
            if (!paymentCounts[month]) {
              paymentCounts[month] = {
                bruto: payment.pagou,
                desconto: 0 // Inicializar desconto se ainda não existir
              };
            } else {
              paymentCounts[month].bruto += payment.pagou;
            }
          });
    
          // Formatar dados para o gráfico
          const dataArr = Object.entries(paymentCounts).map(([month, values], index) => ({
            name: monthNames[month], // Usar nomes dos meses
            bruto: values.bruto,
            fill: colors[index],
          }));
    
          // Definir dados no estado
          setData(dataArr);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchData();
    }, [filtroAno]); 
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
    <Bar dataKey="bruto" fill="#82ca9d" name="Montante Arrendado" />
  </BarChart>
</ResponsiveContainer>
  );
};

export default Example;