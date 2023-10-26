import React, { useState, useEffect, PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { parseISO, differenceInYears } from 'date-fns';

const COLORS = ['#000000', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733'];
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
  const [data, setData] = useState([
    { name: 'Sem dados', value: 1},
    { name: 'Crianças', value: 1 },
    { name: 'Adolescentes', value: 1 },
    { name: 'Jovens Adultos', value: 1 },
    { name: 'Adultos', value: 1 },
    { name: 'Idosos', value: 1 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const hoje = Date.now();
      try {
        const response = await fetch('https://baereodontologiav888-dtkwd4jzea-rj.a.run.app/pacientes');
        const ageData = await response.json();

        // Calcular a idade e atualizar o valor de cada faixa etária
        ageData.forEach(patient => {
          const dataNascimento = parseISO(patient.data_de_nascimento);
          if (!isNaN(dataNascimento.getTime())) {
            const idade = differenceInYears(hoje, dataNascimento);
            if (idade === 0) {
              setData(prevData => updateData(prevData, 0));
            }
            if (idade >= 1 && idade <= 12) {
              setData(prevData => updateData(prevData, 1));
            } else if (idade > 12 && idade <= 18) {
              setData(prevData => updateData(prevData, 2));
            } else if (idade >= 19 && idade <= 24) {
              setData(prevData => updateData(prevData, 3));
            } else if (idade >= 25 && idade <= 59) {
              setData(prevData => updateData(prevData, 4));
            } else {
              setData(prevData => updateData(prevData, 5));
            }
          } else {
            console.log(`Data de nascimento inválida para: ${patient.nome}`);
          }
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const updateData = (prevData, index) => {
    const newData = [...prevData];
    newData[index].value += 1;
    return newData;
  };

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart width={600} height={600}>
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