import styles from "./PotsCard.module.scss";
import { Icons } from "../../icons/Icons";
import { Data } from "@/utils/interfaces";
import { calculateTotal } from "@/utils/functions";
import AmountCard from "../../amountCard/AmountCard";
import LinkToPage from "../../linkToPage/LinkToPage";

export default function PotsCard({ pots }: { pots: Data["pots"] }) {
  return (
    <section className={styles.pots}>
      <div className={styles.pots__header}>
        <h2 className={styles.pots__header_title}>Pots</h2>
        <LinkToPage href="/pots" title="See Details" />
      </div>

      <div className={styles.pots__content}>
        <div className={styles.pots__totalSaved}>
          <Icons.Pot className={styles.pots__totalSaved_icon} />
          <div className={styles.pots__totalSaved_info}>
            <h3 className={styles.pots__totalSaved_title}>Total Saved</h3>
            <p className={styles.pots__totalSaved_amount}>
              ${calculateTotal(pots, "total")}
            </p>
          </div>
        </div>
        <div className={styles.pots__saveCategories}>
          {pots.slice(0, 4).map((pot, index) => (
            <AmountCard
              key={index}
              category={pot.name}
              amount={pot.total}
              theme={pot.theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
