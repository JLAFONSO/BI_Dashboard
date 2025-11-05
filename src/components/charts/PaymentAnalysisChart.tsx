import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../../types';

interface ChartProps {
  data: Transaction[];
}

const COLORS = ['#4f46e5', '#7c3aed', '#a855f7', '#d946ef'];

const PaymentAnalysisChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = data
    .reduce((acc, { cardType }) => {
      const existing = acc.find(item => item.name === cardType);
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({ name: cardType, value: 1 });
      }
      return acc;
    }, [] as { name: string; value: number }[]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
          labelStyle={{ color: '#F9FAFB' }}
        />
        <Legend wrapperStyle={{ color: '#F9FAFB' }} />
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PaymentAnalysisChart;
