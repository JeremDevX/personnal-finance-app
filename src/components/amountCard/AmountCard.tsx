import styles from "./AmountCard.module.scss";
import { formatCurrencyNumber } from "@/utils/functions";

interface AmountCardProps {
  className?: string;
  category: string;
  amount: number;
  theme: string;
  formatNumber?: boolean;
}

export default function AmountCard(props: AmountCardProps) {
  const { category, theme, amount, formatNumber, className } = props;
  return (
    <div
      className={`${styles.amountCard} ${className}`}
      style={{ "--card-color": theme } as React.CSSProperties}
    >
      <p className={styles.amountCard__category}>{category}</p>
      <p className={styles.amountCard__amount}>
        {formatNumber ? formatCurrencyNumber(amount) : `$${amount}`}
      </p>
    </div>
  );
}
