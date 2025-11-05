import React from 'react';
import { UploadCloud, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UploadPrompt: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 px-6 bg-dark-card border-2 border-dashed border-dark-border rounded-lg"
    >
      <UploadCloud className="mx-auto h-16 w-16 text-gray-500" />
      <h3 className="mt-4 text-xl font-semibold text-white">Nenhuns Dados para Analisar</h3>
      <p className="mt-2 text-md text-gray-400">
        Para começar, por favor carregue um ou mais ficheiros de transações.
      </p>
      <Link
        to="/upload"
        className="mt-6 inline-flex items-center bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
      >
        Ir para a Página de Carregamento
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </motion.div>
  );
};

export default UploadPrompt;
