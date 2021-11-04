export const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' });

export const currencyFormat = (value) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format(value / 100);

export const daysAgoFormat = (date) => {
  const singleDay = 1000 * 60 * 60 * 24;
  const diffInTime = new Date(date) - new Date();
  return Math.round(diffInTime / singleDay);
};
