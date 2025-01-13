import BalanceCard from "@/components/balance/BalanceCard/BalanceCard";
import styles from "./page.module.scss";
import { Data } from "@/utils/interfaces";
import { promises as fs } from "fs";
import PotsCard from "@/components/pots/PotsCard/PotsCard";
import TransactionsCard from "@/components/transactions/TransactionsCard/TransactionsCard";
import BudgetsCard from "@/components/budgets/BudgetsCard/BudgetsCard";
import RecurringBillsCard from "@/components/recurringBills/RecurringBillsCard/RecurringBillsCard";

export default async function OverviewPage() {
  const file = await fs.readFile(process.cwd() + "/src/app/data.json", "utf8");
  const data: Data = JSON.parse(file);

  return (
    <main className={`${styles.overview}`}>
      <h1 className={styles.overview__title}>Overview</h1>
      <BalanceCard balance={data.balance} />
      <div className={styles.overview__content}>
        <div className={styles.overview__leftSection}>
          <PotsCard pots={data.pots} />
          <TransactionsCard transactions={data.transactions} />
        </div>
        <div className={styles.overview__rightSection}>
          <BudgetsCard
            budgets={data.budgets}
            transactions={data.transactions}
          />
          <RecurringBillsCard transactions={data.transactions} />
        </div>
      </div>
    </main>
  );
}
