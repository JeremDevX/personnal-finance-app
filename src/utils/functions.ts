export const formatCurrencyNumber = (
  value: number,
  showOperator?: boolean
): string => {
  const formattedValue = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));

  if (showOperator) {
    return value >= 0 ? `+$${formattedValue}` : `-$${formattedValue}`;
  }

  return `$${formattedValue}`;
};
