import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { faker } from '@faker-js/faker';
import { AnimatePresence } from 'framer-motion';

import Sidebar from './components/layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import UploadProgressModal from './components/dashboard/UploadProgressModal';

import { Transaction, UploadProgress, CardType } from './types';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([]);
  const [uploadSummary, setUploadSummary] = useState<string | null>(null);
  
  const [uploadProgress, setUploadProgress] = useState<UploadProgress[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [stagedFiles, setStagedFiles] = useState<File[]>([]);

  const navigate = useNavigate();

  const handleFilesSelected = (files: File[]) => {
    setStagedFiles(prev => [...prev, ...files]);
  };

  const processAndLoadFiles = async () => {
    if (stagedFiles.length === 0) return;

    const XLSX = (window as any).XLSX;
    if (!XLSX) {
      alert("A biblioteca de leitura de Excel não foi carregada. Tente novamente.");
      return;
    }

    const initialProgress: UploadProgress[] = stagedFiles.map(file => ({
      name: file.name,
      status: 'pending',
      progress: 0,
    }));
    setUploadProgress(initialProgress);
    setIsUploadModalOpen(true);

    const updateProgress = (index: number, newStatus: Partial<UploadProgress>) => {
      setUploadProgress(prev => {
        const newProgress = [...prev];
        newProgress[index] = { ...newProgress[index], ...newStatus };
        return newProgress;
      });
    };

    let allNewTransactions: Transaction[] = [];
    const newFileNames: string[] = [];

    for (let i = 0; i < stagedFiles.length; i++) {
      const file = stagedFiles[i];
      try {
        updateProgress(i, { status: 'reading' });
        const data = await new Promise<ArrayBuffer>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
          reader.onerror = (e) => reject(e.target?.error);
          reader.onprogress = (e) => {
            if (e.lengthComputable) {
              const percentage = Math.round((e.loaded / e.total) * 90);
              updateProgress(i, { progress: percentage });
            }
          };
          reader.readAsArrayBuffer(file);
        });

        updateProgress(i, { status: 'processing', progress: 95 });
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { cellDates: true });

        const processedTransactions = jsonData
          .map((row: any): Transaction | null => {
            if (!row || !row.date) return null;
            const dateObj = new Date(row.date);
            if (isNaN(dateObj.getTime())) return null;
            const amount = parseFloat(row.amount);
            if (isNaN(amount)) return null;
            const allowedTransactionTypes: Array<'Credit' | 'Debit'> = ['Credit', 'Debit'];
            const transactionType = allowedTransactionTypes.includes(row.type) ? row.type : 'Credit';
            const allowedCardTypes: CardType[] = ['Visa', 'Mastercard', 'Amex', 'Outro'];
            const cardType: CardType = allowedCardTypes.includes(row.cardType) ? row.cardType : 'Outro';
            return {
              id: row.id || faker.string.uuid(),
              date: dateObj.toISOString(),
              amount: amount,
              type: transactionType,
              country: row.country || 'Desconhecido',
              cardType: cardType,
              customerId: row.customerId || 'N/A',
              customerName: row.customerName || 'N/A',
            };
          })
          .filter((t): t is Transaction => t !== null);

        if (processedTransactions.length > 0) {
          allNewTransactions.push(...processedTransactions);
          newFileNames.push(file.name);
        }

        updateProgress(i, { status: 'done', progress: 100 });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
        updateProgress(i, { status: 'error', error: errorMessage, progress: 100 });
      }
    }

    if (allNewTransactions.length > 0) {
      const dates = allNewTransactions.map(t => new Date(t.date));
      const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
      const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
      const uniqueCountries = new Set(allNewTransactions.map(t => t.country));

      const summaryText = `Foram processadas ${allNewTransactions.length} novas transações de ${newFileNames.length} ficheiro(s), entre ${format(minDate, 'dd/MM/yyyy')} e ${format(maxDate, 'dd/MM/yyyy')}. Os dados abrangem ${uniqueCountries.size} países distintos.`;
      
      setTransactions(prev => [...prev, ...allNewTransactions]);
      setUploadedFileNames(prev => [...new Set([...prev, ...newFileNames])]);
      setUploadSummary(summaryText);
      setStagedFiles([]);
      
      setTimeout(() => {
        setIsUploadModalOpen(false);
        navigate('/');
      }, 1500);

    } else {
      const hasErrors = uploadProgress.some(p => p.status === 'error');
      if (!hasErrors) {
        setUploadSummary("Os ficheiros carregados estavam vazios ou não continham dados válidos.");
      }
       setTimeout(() => {
        setIsUploadModalOpen(false);
      }, 2000);
    }
  };

  const uniqueFilterOptions = useMemo(() => {
    const countries = [...new Set(transactions.map(t => t.country))].sort();
    const cardTypes = [...new Set(transactions.map(t => t.cardType))].sort();
    return { countries, cardTypes };
  }, [transactions]);

  return (
    <div className="flex min-h-screen bg-dark-bg text-gray-100">
      <Sidebar />
      <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-screen-2xl mx-auto">
        <Routes>
          <Route 
            path="/" 
            element={
              <DashboardPage 
                transactions={transactions}
                uniqueFilterOptions={uniqueFilterOptions}
                uploadSummary={uploadSummary}
                uploadedFileNames={uploadedFileNames}
                onDismissSummary={() => setUploadSummary(null)}
              />
            } 
          />
          <Route 
            path="/upload" 
            element={
              <UploadPage
                stagedFiles={stagedFiles}
                onFilesSelected={handleFilesSelected}
                onProcessFiles={processAndLoadFiles}
                onRemoveFile={(fileToRemove) => setStagedFiles(stagedFiles.filter(f => f !== fileToRemove))}
              />
            } 
          />
        </Routes>
      </div>
      <AnimatePresence>
        {isUploadModalOpen && (
          <UploadProgressModal
            progressList={uploadProgress}
            onClose={() => setIsUploadModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
