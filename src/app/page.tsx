import Balance from "@/components/balance/Balance";
import styles from "./page.module.scss";
import { Data } from "@/utils/interfaces";
import { promises as fs } from "fs";
import Pots from "@/components/pots/Pots";
import Transactions from "@/components/transactions/Transactions";
import Budgets from "@/components/budgets/Budgets";
import RecurringBills from "@/components/recurringBills/RecurringBills";

export default async function OverviewPage() {
  const file = await fs.readFile(process.cwd() + "/src/app/data.json", "utf8");
  const data: Data = JSON.parse(file);

  return (
    <main className={`${styles.overview}`}>
      <h1 className={styles.overview__title}>Overview</h1>
      <Balance balance={data.balance} />
      <div className={styles.overview__content}>
        <div className={styles.overview__leftSection}>
          <Pots pots={data.pots} />
          <Transactions transactions={data.transactions} />
        </div>
        <div className={styles.overview__rightSection}>
          <Budgets budgets={data.budgets} transactions={data.transactions} />
          <RecurringBills transactions={data.transactions} />
        </div>
      </div>
    </main>
  );
}
