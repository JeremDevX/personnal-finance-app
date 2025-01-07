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

export const lightenColor = (color: string, percent: number): string => {
  const num = parseInt(color.slice(1), 16);
  const r = Math.min(255, (num >> 16) + percent * 255);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + percent * 255);
  const b = Math.min(255, (num & 0x0000ff) + percent * 255);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

export const calculateTotal = <T>(items: T[], key: keyof T): number => {
  return items.reduce((total, item) => total + (item[key] as number), 0);
};
