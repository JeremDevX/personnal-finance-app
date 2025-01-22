"use client";

import { Data } from "@/utils/interfaces";
import styles from "./BudgetsCard.module.scss";
import { calculateTotal, formatCurrencyNumber } from "@/utils/functions";
import BudgetsChart from "@/components/budgetsChart/BudgetsChart";
import LinkToPage from "../../linkToPage/LinkToPage";
import React, { createContext, useContext } from "react";
import AmountCard from "@/components/amountCard/AmountCard";

interface BudgetsCardProps {
  isOnOverviewPage?: boolean;
  children: React.ReactNode;
  budgets: Data["budgets"];
  transactions: Data["transactions"];
}

interface BudgetCardListProps {
  category: string;
  amountSpent: number;
  limit: number;
  theme: string;
  formatNumber?: boolean;
}

const BudgetsContext = createContext<{
  budgets: Data["budgets"];
  transactions: Data["transactions"];
}>({ budgets: [], transactions: [] });

export const useBudgets = () => useContext(BudgetsContext);

export default function BudgetsCard({
  children,
  budgets,
  transactions,
  isOnOverviewPage,
}: BudgetsCardProps) {
  return (
    <BudgetsContext.Provider value={{ budgets, transactions }}>
      <section className={styles.budgets}>
        {isOnOverviewPage ? (
          <>
            <OverviewHeader />
            <div className={styles.budgets__contentOverview}>{children}</div>
          </>
        ) : (
          <div className={styles.budgets__contentBudgetPage}>{children}</div>
        )}
      </section>
    </BudgetsContext.Provider>
  );
}

function OverviewHeader() {
  return (
    <div className={styles.budgets__header} datatype="header">
      <h2 className={styles.budgets__header_title}>Budgets</h2>
      <LinkToPage href="/budgets" title="See Details" />
    </div>
  );
}

export function BudgetsCardChart() {
  const { budgets, transactions } = useBudgets();
  const calculateTotalSpent = (
    budgets: Data["budgets"],
    transactions: Data["transactions"]
  ) => {
    const budgetCategories = budgets.map((budget) => budget.category);
    return Math.abs(
      transactions
        .filter((transaction) =>
          budgetCategories.includes(transaction.category)
        )
        .reduce((total, transaction) => total + transaction.amount, 0)
    );
  };

  return (
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
  );
}

export function BudgetsCardOverviewCategories() {
  const { budgets } = useBudgets();
  return (
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
  );
}

export function BudgetCategorySpentAndLimit() {
  const { budgets, transactions } = useBudgets();

  const calculateTotalSpentByCategory = (
    category: string,
    transactions: Data["transactions"]
  ) =>
    Math.abs(
      transactions
        .filter((transaction) => transaction.category === category)
        .reduce((total, transaction) => total + transaction.amount, 0)
    );

  return (
    <div className={styles.budgetSpentAndLimit}>
      <h2 className={styles.budgetSpentAndLimit__title}>Spending Summary</h2>
      <ul className={styles.budgetSpentAndLimit__list}>
        {budgets.map((budget, index) => (
          <li className={styles.budgetSpentAndLimit__item} key={index}>
            <div
              className={styles.budgetSpentAndLimit__item_label}
              style={{ "--card-color": budget.theme } as React.CSSProperties}
            ></div>
            <p className={styles.budgetSpentAndLimit__item_category}>
              {budget.category}
            </p>
            <div className={styles.budgetSpentAndLimit__item_amountContainer}>
              <p className={styles.budgetSpentAndLimit__item_amount}>
                <span className={styles.budgetSpentAndLimit__item_spent}>
                  {formatCurrencyNumber(
                    calculateTotalSpentByCategory(budget.category, transactions)
                  )}
                </span>{" "}
                of {formatCurrencyNumber(budget.maximum)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
