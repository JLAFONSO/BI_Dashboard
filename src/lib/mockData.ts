import { faker } from '@faker-js/faker';
import { Transaction } from '../types';

// Nota: Esta função já não é usada para o estado inicial,
// mas é mantida para fins de teste ou desenvolvimento futuro.

const countries = ['Portugal', 'Brasil', 'Espanha', 'Angola', 'EUA', 'França'];
const cardTypes: ('Visa' | 'Mastercard' | 'Amex')[] = ['Visa', 'Mastercard', 'Amex'];
const transactionTypes: ('Credit' | 'Debit')[] = ['Credit', 'Debit'];

export const generateMockData = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  for (let i = 0; i < count; i++) {
    transactions.push({
      id: faker.string.uuid(),
      date: faker.date.between({ from: '2024-01-01T00:00:00.000Z', to: '2025-07-31T00:00:00.000Z' }).toISOString(),
      amount: parseFloat(faker.finance.amount(5, 5000, 2)),
      type: faker.helpers.arrayElement(transactionTypes),
      country: faker.helpers.arrayElement(countries),
      cardType: faker.helpers.arrayElement(cardTypes),
      customerId: faker.string.uuid(),
      customerName: faker.person.fullName(),
    });
  }
  return transactions;
};
