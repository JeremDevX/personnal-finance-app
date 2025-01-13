import { Data } from "@/utils/interfaces";
import styles from "./BalanceCard.module.scss";
import { formatCurrencyNumber } from "@/utils/functions";

export default function BalanceCard({ balance }: { balance: Data["balance"] }) {
  const balanceEntries: [key: string, value: number][] =
    Object.entries(balance);

  return (
    <section className={styles.balance}>
      {balanceEntries.map(([key, value]) => (
        <div className={styles.balance__card} key={key}>
          <h2 className={styles.balance__card_name}>
            {key === "current" ? "Current Balance" : key}
          </h2>
          <p className={styles.balance__card_amount}>
            {formatCurrencyNumber(value)}
          </p>
        </div>
      ))}
    </section>
  );
}
