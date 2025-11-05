import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud } from 'lucide-react';
import { UploadProgress } from '../../types';
import FileProgress from '../ui/FileProgress';

interface UploadProgressModalProps {
  progressList: UploadProgress[];
  onClose: () => void;
}

const UploadProgressModal: React.FC<UploadProgressModalProps> = ({ progressList, onClose }) => {
  const allDoneOrError = progressList.length > 0 && progressList.every(p => p.status === 'done' || p.status === 'error');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-dark-card rounded-xl shadow-2xl w-full max-w-2xl border border-dark-border"
        >
          <div className="p-6 border-b border-dark-border">
            <div className="flex items-center space-x-3">
              <UploadCloud className="h-6 w-6 text-brand-primary" />
              <h2 className="text-xl font-bold text-white">A Processar Ficheiros</h2>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              Aguarde enquanto os seus ficheiros são lidos e os dados integrados.
            </p>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
            {progressList.map((item, index) => (
              <FileProgress key={index} {...item} />
            ))}
          </div>

          <div className="p-4 bg-gray-900/50 rounded-b-xl flex justify-end">
            <button
              onClick={onClose}
              disabled={!allDoneOrError}
              className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-brand-secondary"
            >
              {allDoneOrError ? 'Fechar' : 'A Processar...'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UploadProgressModal;
