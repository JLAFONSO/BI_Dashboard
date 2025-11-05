export type CardType = 'Visa' | 'Mastercard' | 'Amex' | 'Outro';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  type: 'Credit' | 'Debit';
  country: string;
  cardType: CardType;
  customerId: string;
  customerName: string;
}

export interface Filters {
  startDate: Date | null;
  endDate: Date | null;
  transactionType: string;
  country: string;
  cardType: string;
  minAmount: number | string;
  maxAmount: number | string;
}

export interface UploadProgress {
  name: string;
  status: 'pending' | 'reading' | 'processing' | 'done' | 'error';
  progress: number;
  error?: string;
}
