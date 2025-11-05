import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Transaction } from '../../types';

interface ChartProps {
  data: Transaction[];
}

const TemporalAnalysisChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = data
    .reduce((acc, { date, amount }) => {
      const day = format(new Date(date), 'yyyy-MM-dd');
      const existing = acc.find(item => item.day === day);
      if (existing) {
        existing.volume += amount;
      } else {
        acc.push({ day, volume: amount });
      }
      return acc;
    }, [] as { day: string; volume: number }[])
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="day" tick={{ fill: '#9CA3AF' }} tickFormatter={(tick) => format(new Date(tick), 'dd/MM')} />
        <YAxis tick={{ fill: '#9CA3AF' }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
          labelStyle={{ color: '#F9FAFB' }}
          formatter={(value: number) => [new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value), 'Volume']}
        />
        <Legend wrapperStyle={{ color: '#F9FAFB' }} />
        <Line type="monotone" dataKey="volume" name="Volume de Transações" stroke="#4f46e5" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TemporalAnalysisChart;
