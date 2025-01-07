import { Data } from "@/utils/interfaces";
import styles from "./Balance.module.scss";

export default async function Balance({
  balance,
}: {
  balance: Data["balance"];
}) {
  const balanceEntries: [key: string, value: number][] =
    Object.entries(balance);

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <section className={styles.balance}>
      {balanceEntries.map(([key, value]) => (
        <div className={styles.balance__card} key={key}>
          <h2 className={styles.balance__card_name}>
            {key === "current" ? "Current Balance" : key}
          </h2>
          <p className={styles.balance__card_amount}>${formatNumber(value)}</p>
        </div>
      ))}
    </section>
  );
}
