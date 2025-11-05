import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { UploadProgress } from '../../types';

const FileProgress: React.FC<UploadProgress> = ({ name, status, progress, error }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'reading':
      case 'processing':
        return <Loader className="h-5 w-5 text-blue-400 animate-spin" />;
      case 'done':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'reading': return `Lendo... ${progress}%`;
      case 'processing': return 'Processando...';
      case 'done': return 'Concluído';
      case 'error': return 'Erro';
      default: return '';
    }
  };

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-dark-border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="flex-shrink-0">{getStatusIcon()}</div>
          <p className="text-sm font-medium text-gray-200 truncate" title={name}>{name}</p>
        </div>
        <span className="text-xs font-semibold text-gray-400">{getStatusText()}</span>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          className={`h-2.5 rounded-full ${status === 'error' ? 'bg-red-500' : 'bg-blue-500'}`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.2 }}
        />
      </div>

      {status === 'error' && error && (
        <div className="mt-2 flex items-center space-x-2 text-red-400 text-xs">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            <p>Motivo: {error}</p>
        </div>
      )}
    </div>
  );
};

export default FileProgress;
