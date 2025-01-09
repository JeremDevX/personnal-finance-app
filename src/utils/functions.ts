import { Data } from "./interfaces";

/**
 * Formats a number as a currency string.
 * @param value - The number to format.
 * @param showOperator - Whether to show the operator (+ or -) before the number.
 * @returns The formatted currency number in format $(+ or -)123,456.78
 */
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

/**
 * Lightens a color by a given percentage.
 * @param color - The color to lighten.
 * @param percent - The percentage to lighten the color by.
 * @returns The lightened color in the format rgb(255, 255, 255).
 */

export const lightenColor = (color: string, percent: number): string => {
  const num = parseInt(color.slice(1), 16);
  const r = Math.min(255, (num >> 16) + percent * 255);
  const g = Math.min(255, ((num >> 8) & 0x00ff) + percent * 255);
  const b = Math.min(255, (num & 0x0000ff) + percent * 255);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

/**
 * Calculates the total sum of a specific property in an array of objects.
 *
 * @template T - The generic type of the objects in the array.
 * @param items - An array of objects containing the data to process.
 * @param key - The key of the property to sum up. Must be a numeric property.
 * @returns The total sum of the specified property across all objects in the array.
 */
export const calculateTotal = <T>(items: T[], key: keyof T): number => {
  return items.reduce((total, item) => total + (item[key] as number), 0);
};

/**
 * Returns the number of days in a given month for a specific year.
 * @param year - The year (e.g., 2024 for a leap year).
 * @param month - The month (1 = January, 2 = February, ..., 12 = December).
 * @returns The number of days in the month.
 */
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

/**
 * Calculates the total amount of bills due soon, total upcoming, or already paid.
 * @param recurringTransactions - An array of transactions to process.
 * @param type - The type of bills to calculate: "dueSoon" ( for bills within 5 days), "totalUpcoming", or "paid".
 * @returns The total amount of bills for the specified type.
 */
export const calculatesRecurringBills = (
  recurringTransactions: Data["transactions"],
  type: "dueSoon" | "totalUpcoming" | "paid"
) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const today = new Date().getDate();

  const bills = recurringTransactions.filter((transaction) => {
    let transactionDate = new Date(transaction.date).getDate();
    const numberOfDaysCurrentMonth = getDaysInMonth(currentYear, currentMonth);

    if (numberOfDaysCurrentMonth < transactionDate) {
      transactionDate = numberOfDaysCurrentMonth;
    }

    switch (type) {
      case "totalUpcoming":
        if (transactionDate > today) return transaction;
        break;
      case "dueSoon":
        if (transactionDate > today && transactionDate <= today + 5)
          return transaction;
        break;
      case "paid":
        if (transactionDate <= today) return transaction;
        break;
      default:
        throw new Error(`Invalid type: ${type}`);
    }
  });

  return bills.reduce((amount, transaction) => amount + transaction.amount, 0);
};
