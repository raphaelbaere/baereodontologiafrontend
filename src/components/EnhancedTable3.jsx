import React, { useState, useEffect, PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { parseISO, differenceInYears } from 'date-fns';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} dx={x > cx ? -15 : 17} dy={x > cx ? 0 : 2} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Example = () => {
  const [ageData, setAgeData] = useState([
    { name: 'Crianças', value: 1 },
    { name: 'Adolescentes', value: 1 },
    { name: 'Jovens Adultos', value: 1 },
    { name: 'Adultos', value: 1 },
    { name: 'Idosos', value: 1 },
  ]);

  useEffect(() => {
    async function fetchData() {
      const hoje = Date.now();
      try {
        const response = await fetch('https://baereodontologiav888-dtkwd4jzea-rj.a.run.app/pacientes');
        const ageData = await response.json();
        
        // Calcular a idade e atualizar o valor de cada faixa etária
        ageData.forEach(patient => {
          const dataNascimento = parseISO(patient.data_de_nascimento);
          if (!isNaN(dataNascimento.getTime())) {
            const idade = differenceInYears(hoje, dataNascimento);
            if (idade >= 0 && idade <= 12) {
              ageData[0].value++;
            } else if (idade > 12 && idade <= 18) {
              ageData[1].value++;
            } else if (idade >= 19 && idade <= 24) {
              ageData[2].value++;
            } else if (idade >= 25 && idade <= 59) {
              ageData[3].value++;
            } else {
              ageData[4].value++;
            }
          } else {
            console.log(`Data de nascimento inválida para: ${patient.nome}`);
          }
        });

        setAgeData([...ageData]);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart width={600} height={400}>
        <Pie
          data={ageData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
        >
          {ageData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default Example;