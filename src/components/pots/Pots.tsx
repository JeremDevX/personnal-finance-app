import Link from "next/link";
import styles from "./Pots.module.scss";
import { Icons } from "../icons/Icons";
import { CSSProperties } from "react";
import { Data } from "@/utils/interfaces";

export default function Pots({ pots }: { pots: Data["pots"] }) {
  const calculateTotalSaved = (pots: Data["pots"]) => {
    let totalSaved = 0;
    for (let i = 0; i < pots.length; i++) {
      totalSaved += pots[i].total;
    }
    return totalSaved;
  };

  return (
    <section className={styles.pots}>
      <div className={styles.pots__header}>
        <h2 className={styles.pots__header_title}>Pots</h2>
        <Link href="/pots" className={styles.pots__header_link}>
          See Details <Icons.CaretRight />
        </Link>
      </div>

      <div className={styles.pots__content}>
        <div className={styles.pots__totalSaved}>
          <Icons.Pot className={styles.pots__totalSaved_icon} />
          <div className={styles.pots__totalSaved_info}>
            <h3 className={styles.pots__totalSaved_title}>Total Saved</h3>
            <p className={styles.pots__totalSaved_amount}>
              ${calculateTotalSaved(pots)}
            </p>
          </div>
        </div>
        <div className={styles.pots__saveCategories}>
          {pots.slice(0, 4).map((pot, index) => (
            <div
              className={styles.pots__saveCard}
              key={index}
              style={{ "--card-color": pot.theme } as CSSProperties}
            >
              <p className={styles.pots__saveCard_category}>{pot.name}</p>
              <p className={styles.pots__saveCard_amount}>${pot.total}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
