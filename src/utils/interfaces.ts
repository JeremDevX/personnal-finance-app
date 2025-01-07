export interface Data {
  balance: {
    current: number;
    income: number;
    expenses: number;
  };
  transactions: {
    avatar: string;
    name: string;
    category: string;
    date: string;
    amount: number;
    recurring: boolean;
  }[];
  budgets: {
    category: string;
    maximum: number;
    theme: string;
  }[];
  pots: {
    name: string;
    target: number;
    total: number;
    theme: string;
  }[];
}
