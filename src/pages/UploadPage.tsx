import React, { useRef } from 'react';
import { UploadCloud, File, X, Loader } from 'lucide-react';
import Header from '../components/dashboard/Header';

interface UploadPageProps {
  stagedFiles: File[];
  onFilesSelected: (files: File[]) => void;
  onProcessFiles: () => void;
  onRemoveFile: (file: File) => void;
}

const UploadPage: React.FC<UploadPageProps> = ({ stagedFiles, onFilesSelected, onProcessFiles, onRemoveFile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    onFilesSelected(Array.from(selectedFiles));
    if (event.target) event.target.value = '';
  };

  return (
    <>
      <Header title="Gestão de Dados" subtitle="Carregue e processe os seus ficheiros de transações" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-xl font-semibold mb-4">1. Carregar Ficheiros</h3>
          <div
            onClick={handleUploadClick}
            className="border-2 border-dashed border-gray-600 rounded-lg p-10 text-center cursor-pointer hover:border-brand-primary hover:bg-gray-800/20 transition-all"
          >
            <UploadCloud className="mx-auto h-12 w-12 text-gray-500" />
            <p className="mt-4 text-white">Clique ou arraste ficheiros para aqui</p>
            <p className="text-sm text-gray-400">Suporta múltiplos ficheiros .xlsx</p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".xlsx, .xls"
            multiple
          />
        </div>

        {/* Staging Area */}
        <div className="bg-dark-card p-6 rounded-lg border border-dark-border">
          <h3 className="text-xl font-semibold mb-4">2. Analisar e Integrar</h3>
          {stagedFiles.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <File className="h-10 w-10 mb-2" />
              <p>Os ficheiros carregados aparecerão aqui.</p>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex-grow space-y-2 overflow-y-auto pr-2">
                {stagedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded-md">
                    <div className="flex items-center min-w-0">
                      <File className="h-5 w-5 mr-3 text-brand-secondary flex-shrink-0" />
                      <span className="text-sm text-gray-300 truncate" title={file.name}>{file.name}</span>
                    </div>
                    <button onClick={() => onRemoveFile(file)} className="p-1 text-gray-400 hover:text-red-500 rounded-full">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                onClick={onProcessFiles}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Loader className="mr-3 h-5 w-5 animate-spin" />
                Analisar e Integrar {stagedFiles.length} Ficheiro(s)
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadPage;
