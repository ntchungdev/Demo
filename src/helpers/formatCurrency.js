export const formatCurrency = (currency) =>
  currency.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
