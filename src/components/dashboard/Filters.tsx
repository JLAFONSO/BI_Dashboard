import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { X } from 'lucide-react';
import { Filters as FiltersType } from '../../types';

interface FiltersProps {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
  clearFilters: () => void;
  countries: string[];
  cardTypes: string[];
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters, clearFilters, countries, cardTypes }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-dark-card p-4 rounded-lg mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-4 items-end">
        {/* Date Filters */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-1">Data de Início</label>
          <DatePicker
            selected={filters.startDate}
            onChange={(date: Date) => setFilters(prev => ({ ...prev, startDate: date }))}
            className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-brand-primary focus:border-brand-primary"
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-1">Data de Fim</label>
          <DatePicker
            selected={filters.endDate}
            onChange={(date: Date) => setFilters(prev => ({ ...prev, endDate: date }))}
            className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-brand-primary focus:border-brand-primary"
            dateFormat="dd/MM/yyyy"
          />
        </div>

        {/* Other Filters */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-1">Tipo de Transação</label>
          <select name="transactionType" value={filters.transactionType} onChange={handleInputChange} className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-brand-primary focus:border-brand-primary">
            <option value="">Todos</option>
            <option value="Credit">Crédito</option>
            <option value="Debit">Débito</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-1">País</label>
          <select name="country" value={filters.country} onChange={handleInputChange} className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-brand-primary focus:border-brand-primary">
            <option value="">Todos</option>
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-1">Tipo de Cartão</label>
          <select name="cardType" value={filters.cardType} onChange={handleInputChange} className="w-full bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-brand-primary focus:border-brand-primary">
            <option value="">Todos</option>
            {cardTypes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Amount Range */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-400 mb-1">Faixa de Valor</label>
          <div className="flex space-x-2">
            <input type="number" name="minAmount" placeholder="Mín" value={filters.minAmount} onChange={handleInputChange} className="w-1/2 bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-brand-primary focus:border-brand-primary" />
            <input type="number" name="maxAmount" placeholder="Máx" value={filters.maxAmount} onChange={handleInputChange} className="w-1/2 bg-gray-700 text-white p-2 rounded-md border border-gray-600 focus:ring-brand-primary focus:border-brand-primary" />
          </div>
        </div>

        {/* Clear Button */}
        <button onClick={clearFilters} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-300">
          <X className="mr-2 h-5 w-5" />
          Limpar
        </button>
      </div>
    </div>
  );
};

export default Filters;
