import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../../types';

interface ChartProps {
  data: Transaction[];
}

const CustomerSegmentationChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = data
    .reduce((acc, { customerName, amount }) => {
      const existing = acc.find(item => item.name === customerName);
      if (existing) {
        existing.volume += amount;
      } else {
        acc.push({ name: customerName, volume: amount });
      }
      return acc;
    }, [] as { name: string; volume: number }[])
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 5);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis type="number" tick={{ fill: '#9CA3AF' }} />
        <YAxis type="category" dataKey="name" tick={{ fill: '#9CA3AF' }} width={100} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
          labelStyle={{ color: '#F9FAFB' }}
          formatter={(value: number) => [new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value), 'Volume']}
        />
        <Legend wrapperStyle={{ color: '#F9FAFB' }} />
        <Bar dataKey="volume" name="Volume por Cliente" fill="#4f46e5" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomerSegmentationChart;
