import Link from "next/link";
import styles from "./LinkToPage.module.scss";
import { Icons } from "../icons/Icons";

interface LinkToPageProps {
  title: string;
  href: string;
}

export default function LinkToPage({ title, href }: LinkToPageProps) {
  return (
    <>
      <Link href={href} className={styles.link}>
        {title} <Icons.CaretRight />
      </Link>
    </>
  );
}
