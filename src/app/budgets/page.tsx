import { Data } from "@/utils/interfaces";
import styles from "./page.module.scss";
import { promises as fs } from "fs";
import BudgetsCard, {
  BudgetsCardChart,
  BudgetCategorySpentAndLimit,
} from "@/components/budgets/BudgetsCard/BudgetsCard";

export default async function BudgetsPage() {
  const file = await fs.readFile(process.cwd() + "/src/app/data.json", "utf8");
  const data: Data = JSON.parse(file);

  return (
    <main className={styles.budgets}>
      <div className={styles.budgets__header}>
        <h1 className={styles.budgets__title}>Budgets</h1>
        <button>+ Add New Budget</button>
      </div>
      <section className={styles.budgets__content}>
        <div className={styles.budgets__chart}>
          <BudgetsCard budgets={data.budgets} transactions={data.transactions}>
            <BudgetsCardChart />
            <BudgetCategorySpentAndLimit />
          </BudgetsCard>
        </div>
        <div className={styles.budgets__list}></div>
      </section>
    </main>
  );
}
