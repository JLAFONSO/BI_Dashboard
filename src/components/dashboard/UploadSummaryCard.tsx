import React from 'react';
import { Info, X, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface UploadSummaryCardProps {
  summary: string;
  fileNames: string[];
  onDismiss: () => void;
}

const UploadSummaryCard: React.FC<UploadSummaryCardProps> = ({ summary, fileNames, onDismiss }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
      className="bg-blue-900/50 border border-blue-500 text-blue-100 px-4 py-3 rounded-lg relative mb-8 flex flex-col"
      role="alert"
    >
      <div className="flex items-start">
        <Info className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
        <div className="flex-grow">
          <strong className="font-bold">Resumo do Carregamento:</strong>
          <p className="text-sm">{summary}</p>
        </div>
        <button onClick={onDismiss} className="ml-4 p-1 rounded-full hover:bg-blue-800/60 transition-colors" aria-label="Dispensar">
          <X className="h-5 w-5" />
        </button>
      </div>

      {fileNames.length > 0 && (
        <div className="mt-4 pt-3 border-t border-blue-700/50">
          <strong className="font-semibold text-sm">Ficheiros Carregados:</strong>
          <ul className="list-none mt-2 space-y-1 text-xs">
            {fileNames.map((name, index) => (
              <li key={index} className="flex items-center text-gray-300">
                <FileText className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default UploadSummaryCard;
