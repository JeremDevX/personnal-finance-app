"use client";

import { Data } from "@/utils/interfaces";
import styles from "./BudgetsCard.module.scss";
import { calculateTotal } from "@/utils/functions";
import BudgetsChart from "@/components/budgetsChart/BudgetsChart";
import AmountCard from "../../amountCard/AmountCard";
import LinkToPage from "../../linkToPage/LinkToPage";

export default function BudgetsCard({
  budgets,
  transactions,
}: {
  budgets: Data["budgets"];
  transactions: Data["transactions"];
}) {
  const calculateTotalSpent = (
    budgets: Data["budgets"],
    transactions: Data["transactions"]
  ) => {
    const budgetCategories = budgets.map((budget) => budget.category);

    const totalSpent = transactions
      .filter((transaction) => budgetCategories.includes(transaction.category))
      .reduce((total, transaction) => total + transaction.amount, 0);

    return Math.abs(totalSpent);
  };

  return (
    <section className={styles.budgets}>
      <div className={styles.budgets__header}>
        <h2 className={styles.budgets__header_title}>Budgets</h2>
        <LinkToPage href="/budgets" title="See Details" />
      </div>
      <div className={styles.budgets__content}>
        <div className={styles.budgets__chart}>
          <BudgetsChart budgets={budgets} />
          <p className={styles.budgets__chart_summary}>
            <span className={styles.budgets__chart_spent}>
              ${calculateTotalSpent(budgets, transactions).toFixed(0)}
            </span>
            <span className={styles.budgets__chart_limit}>
              of ${calculateTotal(budgets, "maximum")} limit
            </span>
          </p>
        </div>
        <div className={styles.budgets__categories}>
          {budgets.map((budget, index) => (
            <AmountCard
              key={index}
              className={styles.budgets__category}
              category={budget.category}
              amount={budget.maximum}
              theme={budget.theme}
              formatNumber={true}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
