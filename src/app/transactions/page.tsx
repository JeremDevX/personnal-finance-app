import { Data } from "@/utils/interfaces";
import styles from "./page.module.scss";
import { promises as fs } from "fs";
import TransactionsList from "@/components/transactions/TransactionsList/TransactionsList";

export default async function TransactionsPage() {
  const file = await fs.readFile(process.cwd() + "/src/app/data.json", "utf8");
  const data: Data = JSON.parse(file);

  return (
    <main className={styles.transactions}>
      <h1 className={styles.title}>Transactions</h1>
      <section>
        <TransactionsList transactions={data.transactions} />
      </section>
    </main>
  );
}
