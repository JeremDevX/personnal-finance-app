import { Data } from "@/utils/interfaces";
import styles from "./BudgetDetails.module.scss";
import { formatCurrencyNumber } from "@/utils/functions";
import { CSSProperties } from "react";
import LinkToPage from "@/components/linkToPage/LinkToPage";
import Image from "next/image";
import DropdownEditDelete from "@/components/DropdownEditDelete/DropdownEditDelete";

interface BudgetAmountBarProps {
  maximumAmount: number;
  spent: number;
  categoryColor: string;
}

interface BudgetLatestSpendingProps {
  transactions: Data["transactions"];
}

export default function BudgetDetailsContainer({
  budgets,
  transactions,
}: {
  budgets: Data["budgets"];
  transactions: Data["transactions"];
}) {
  const budgetCategories = budgets.map((budget) => budget.category);

  function maximumAmount(category: string) {
    const budget = budgets.find((budget) => budget.category === category);
    return budget?.maximum ?? 0;
  }

  function calculateTotalSpentByCategory(category: string) {
    return Math.abs(
      transactions
        .filter((transaction) => transaction.category === category)
        .reduce((total, transaction) => total + transaction.amount, 0)
    );
  }

  const categoryColor = (category: string) => {
    return budgets.find((budget) => budget.category === category)?.theme || "";
  };

  function getThreeLastTransactions(category: string) {
    return transactions
      .filter((transaction) => transaction.category === category)
      .slice(-3);
  }

  function getUsedColors() {
    return budgets.map((budget) => budget.theme);
  }

  return (
    <>
      {budgetCategories.map((category) => (
        <div className={styles.budgetDetails} key={category}>
          <div className={styles.budgetDetails__header}>
            <span
              className={styles.budgetDetails__header_dot}
              style={
                { "--category-color": categoryColor(category) } as CSSProperties
              }
            ></span>
            <h2 className={styles.budgetDetails__header_title}>{category}</h2>
            <DropdownEditDelete
              type="budgets"
              data={{
                category: category,
                maximum: maximumAmount(category),
                theme: categoryColor(category),
              }}
              allreadyUsedColors={getUsedColors()}
            />
          </div>
          <div className={styles.budgetDetails__bar}>
            <BudgetAmountBar
              maximumAmount={maximumAmount(category)}
              spent={calculateTotalSpentByCategory(category)}
              categoryColor={categoryColor(category)}
            />
          </div>
          <BudgetLatestSpending
            transactions={getThreeLastTransactions(category)}
          />
        </div>
      ))}
    </>
  );
}

function BudgetAmountBar(props: BudgetAmountBarProps) {
  const { maximumAmount, spent, categoryColor } = props;
  return (
    <div className={styles.barContainer}>
      <p className={styles.barContainer__max}>
        Maximum of {formatCurrencyNumber(maximumAmount)}
      </p>
      <div className={styles.barContainer__bar}>
        <div
          className={styles.barContainer__progress}
          style={
            {
              width: `${
                spent >= maximumAmount ? "100" : (spent / maximumAmount) * 100
              }%`,
              "--category-color": categoryColor,
            } as CSSProperties
          }
        ></div>
      </div>
      <div className={styles.barContainer__spentAndRemain}>
        <div className={styles.barContainer__infoContainer}>
          <span
            className={styles.barContainer__label}
            style={{ "--category-color": categoryColor } as CSSProperties}
          ></span>
          <div className={styles.barContainer__infoContent}>
            <span>Spent</span>
            <p
              className={styles.barContainer__infoValue}
              style={{
                color: spent >= maximumAmount ? "var(--red)" : undefined,
              }}
            >
              {formatCurrencyNumber(spent)}
            </p>
          </div>
        </div>
        <div className={styles.barContainer__infoContainer}>
          <span className={styles.barContainer__label}></span>
          <div className={styles.barContainer__infoContent}>
            <span>Remaining</span>
            <p className={styles.barContainer__infoValue}>
              {spent >= maximumAmount
                ? "$0"
                : formatCurrencyNumber(maximumAmount - spent)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BudgetLatestSpending({ transactions }: BudgetLatestSpendingProps) {
  return (
    <div className={styles.latestSpending}>
      <div className={styles.latestSpending__header}>
        <h3 className={styles.latestSpending__title}>Latest Spending</h3>
        <LinkToPage href="/transactions" title="See all" />
      </div>
      <ul className={styles.latestSpending__list}>
        {transactions.map((transaction, index) => (
          <li className={styles.latestSpending__item} key={index}>
            <div className={styles.latestSpending__details}>
              <Image
                className={styles.latestSpending__avatar}
                src={transaction.avatar}
                alt={transaction.name}
                width={32}
                height={32}
              />
              <h4 className={styles.latestSpending__name}>
                {transaction.name}
              </h4>
            </div>
            <div className={styles.latestSpending__meta}>
              <p className={styles.latestSpending__amount}>
                {formatCurrencyNumber(transaction.amount, true)}
              </p>
              <time className={styles.latestSpending__date}>
                {new Intl.DateTimeFormat("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(new Date(transaction.date))}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
