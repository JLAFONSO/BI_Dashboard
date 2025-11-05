import React from 'react';
import Card from '../ui/Card';
import { motion } from 'framer-motion';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, icon }) => {
  return (
    <Card className="flex items-center p-4">
      <motion.div
        whileHover={{ scale: 1.2, rotate: 10 }}
        className="bg-brand-primary p-3 rounded-full mr-4 text-white"
      >
        {icon}
      </motion.div>
      <div>
        <p className="text-sm text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </Card>
  );
};

export default KpiCard;
