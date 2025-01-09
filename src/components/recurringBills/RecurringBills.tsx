import { Data } from "@/utils/interfaces";
import styles from "./RecurringBills.module.scss";
import LinkToPage from "../linkToPage/LinkToPage";
import {
  calculatesRecurringBills,
  formatCurrencyNumber,
} from "@/utils/functions";

export default function RecurringBills({
  transactions,
}: {
  transactions: Data["transactions"];
}) {
  const recurringTransactions = transactions.filter(
    (transaction) => transaction.recurring
  );

  return (
    <section className={styles.recurringBills}>
      <div className={styles.recurringBills__header}>
        <h2 className={styles.recurringBills__header_title}>Recurring Bills</h2>
        <LinkToPage href="/recurring-bills" title="See Details" />
      </div>
      <ul className={styles.recurringBills__list}>
        <li className={styles.recurringBills__list_item}>
          <h3 className={styles.recurringBills__list_name}>Paid Bills</h3>
          {formatCurrencyNumber(
            calculatesRecurringBills(recurringTransactions, "paid")
          )}
        </li>
        <li className={styles.recurringBills__list_item}>
          <h3 className={styles.recurringBills__list_name}>Total Upcoming</h3>
          {formatCurrencyNumber(
            calculatesRecurringBills(recurringTransactions, "totalUpcoming")
          )}
        </li>
        <li className={styles.recurringBills__list_item}>
          <h3 className={styles.recurringBills__list_name}>Due Soon</h3>
          {formatCurrencyNumber(
            calculatesRecurringBills(recurringTransactions, "dueSoon")
          )}
        </li>
      </ul>
    </section>
  );
}
