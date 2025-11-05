import React from 'react';
import Card from '../ui/Card';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-72 w-full">
        {children}
      </div>
    </Card>
  );
};

export default ChartCard;
