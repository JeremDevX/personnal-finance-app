import { Data } from "@/utils/interfaces";
import styles from "./TransactionsCard.module.scss";
import Image from "next/image";
import { formatCurrencyNumber } from "@/utils/functions";
import LinkToPage from "../../linkToPage/LinkToPage";

export default function TransactionsCard({
  transactions,
}: {
  transactions: Data["transactions"];
}) {
  return (
    <section className={styles.transactions}>
      <div className={styles.transactions__header}>
        <h2 className={styles.transactions__header_title}>Transactions</h2>
        <LinkToPage href="/transactions" title="View All" />
      </div>
      <ul className={styles.transactions__list}>
        {transactions.slice(0, 5).map((transaction, index) => (
          <li className={styles.transactions__element} key={index}>
            <div className={styles.transactions__element_info}>
              <Image
                src={transaction.avatar}
                alt={transaction.name}
                width={40}
                height={40}
                className={styles.transactions__element_avatar}
              />
              <h3 className={styles.transactions__element_title}>
                {transaction.name}
              </h3>
            </div>
            <div className={styles.transactions__element_data}>
              <h3
                className={`${styles.transactions__element_amount} ${
                  transaction.amount > 0
                    ? styles.transactions__element_amount_positive
                    : ""
                }`}
              >
                {formatCurrencyNumber(transaction.amount, true)}
              </h3>
              <time className={styles.transactions__element_date}>
                {new Date(transaction.date).toLocaleDateString()}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
