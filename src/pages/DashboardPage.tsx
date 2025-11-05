import React, { useState, useMemo } from 'react';
import { DollarSign, BarChart2, Users, Globe, ArrowUp, CreditCard, TrendingUp } from 'lucide-react';
import { isWithinInterval } from 'date-fns';
import { AnimatePresence } from 'framer-motion';

import Header from '../components/dashboard/Header';
import FiltersComponent from '../components/dashboard/Filters';
import KpiCard from '../components/dashboard/KpiCard';
import ChartCard from '../components/charts/ChartCard';
import TemporalAnalysisChart from '../components/charts/TemporalAnalysisChart';
import GeoDistributionChart from '../components/charts/GeoDistributionChart';
import PaymentAnalysisChart from '../components/charts/PaymentAnalysisChart';
import CustomerSegmentationChart from '../components/charts/CustomerSegmentationChart';
import UploadSummaryCard from '../components/dashboard/UploadSummaryCard';
import UploadPrompt from '../components/ui/UploadPrompt';

import { Transaction, Filters } from '../types';

interface DashboardPageProps {
  transactions: Transaction[];
  uniqueFilterOptions: { countries: string[]; cardTypes: string[] };
  uploadSummary: string | null;
  uploadedFileNames: string[];
  onDismissSummary: () => void;
}

const initialFilters: Filters = {
  startDate: null,
  endDate: null,
  transactionType: '',
  country: '',
  cardType: '',
  minAmount: '',
  maxAmount: '',
};

const DashboardPage: React.FC<DashboardPageProps> = ({ 
  transactions, 
  uniqueFilterOptions,
  uploadSummary,
  uploadedFileNames,
  onDismissSummary
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const filteredData = useMemo(() => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      const { startDate, endDate, transactionType, country, cardType, minAmount, maxAmount } = filters;

      if (startDate && endDate && !isWithinInterval(transactionDate, { start: startDate, end: endDate })) return false;
      if (transactionType && t.type !== transactionType) return false;
      if (country && t.country !== country) return false;
      if (cardType && t.cardType !== cardType) return false;
      if (minAmount && t.amount < Number(minAmount)) return false;
      if (maxAmount && t.amount > Number(maxAmount)) return false;

      return true;
    });
  }, [transactions, filters]);

  const kpis = useMemo(() => {
    const totalVolume = filteredData.reduce((sum, t) => sum + t.amount, 0);
    const totalTransactions = filteredData.length;
    const activeCustomers = new Set(filteredData.map(t => t.customerId)).size;
    const activeCountries = new Set(filteredData.map(t => t.country)).size;
    const uniqueCards = new Set(filteredData.map(t => t.cardType)).size;
    const ticketMedio = totalTransactions > 0 ? totalVolume / totalTransactions : 0;
    const maxTransaction = Math.max(0, ...filteredData.map(t => t.amount));

    const formatCurrency = (value: number) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(value);

    return {
      totalVolume: formatCurrency(totalVolume),
      totalTransactions: totalTransactions.toLocaleString('pt-PT'),
      activeCustomers,
      activeCountries,
      ticketMedio: formatCurrency(ticketMedio),
      maxTransaction: formatCurrency(maxTransaction),
      uniqueCards,
    };
  }, [filteredData]);

  return (
    <>
      <Header title="Painel Principal" subtitle="Análise de Transações do Board Executivo" />
      {transactions.length === 0 ? (
        <UploadPrompt />
      ) : (
        <main>
          <FiltersComponent
            filters={filters}
            setFilters={setFilters}
            clearFilters={() => setFilters(initialFilters)}
            countries={uniqueFilterOptions.countries}
            cardTypes={uniqueFilterOptions.cardTypes}
          />

          <AnimatePresence>
            {uploadSummary && (
              <UploadSummaryCard
                summary={uploadSummary}
                fileNames={uploadedFileNames}
                onDismiss={onDismissSummary}
              />
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-8">
            <KpiCard title="Volume Total" value={kpis.totalVolume} icon={<DollarSign />} />
            <KpiCard title="Total Transações" value={kpis.totalTransactions} icon={<BarChart2 />} />
            <KpiCard title="Clientes Ativos" value={kpis.activeCustomers} icon={<Users />} />
            <KpiCard title="Países Ativos" value={kpis.activeCountries} icon={<Globe />} />
            <KpiCard title="Ticket Médio" value={kpis.ticketMedio} icon={<TrendingUp />} />
            <KpiCard title="Maior Transação" value={kpis.maxTransaction} icon={<ArrowUp />} />
            <KpiCard title="Cartões Únicos" value={kpis.uniqueCards} icon={<CreditCard />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ChartCard title="Análise Temporal (Volume por Dia)">
              <TemporalAnalysisChart data={filteredData} />
            </ChartCard>
            <ChartCard title="Distribuição Geográfica (Volume por País)">
              <GeoDistributionChart data={filteredData} />
            </ChartCard>
            <ChartCard title="Análise de Pagamentos (Distribuição por Tipo de Cartão)">
              <PaymentAnalysisChart data={filteredData} />
            </ChartCard>
            <ChartCard title="Top 5 Clientes por Volume">
              <CustomerSegmentationChart data={filteredData} />
            </ChartCard>
          </div>
        </main>
      )}
    </>
  );
};

export default DashboardPage;
