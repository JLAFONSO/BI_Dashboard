import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Transaction } from '../../types';

interface ChartProps {
  data: Transaction[];
}

const GeoDistributionChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = data
    .reduce((acc, { country, amount }) => {
      const existing = acc.find(item => item.country === country);
      if (existing) {
        existing.volume += amount;
      } else {
        acc.push({ country, volume: amount });
      }
      return acc;
    }, [] as { country: string; volume: number }[])
    .sort((a, b) => b.volume - a.volume);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="country" tick={{ fill: '#9CA3AF' }} />
        <YAxis tick={{ fill: '#9CA3AF' }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
          labelStyle={{ color: '#F9FAFB' }}
          formatter={(value: number) => [new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value), 'Volume']}
        />
        <Legend wrapperStyle={{ color: '#F9FAFB' }} />
        <Bar dataKey="volume" name="Volume por País" fill="#7c3aed" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GeoDistributionChart;
