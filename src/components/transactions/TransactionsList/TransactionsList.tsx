"use client";

import { Data } from "@/utils/interfaces";
import styles from "./TransactionsList.module.scss";
import { useState } from "react";
import Image from "next/image";
import { formatCurrencyNumber } from "@/utils/functions";
import { Icons } from "@/components/icons/Icons";
import Pagination from "@/components/pagination/Pagination";

interface TransactionElementProps {
  name: string;
  category: string;
  amount: number;
  date: Date | string;
  avatar: string;
}

function TransactionElement(props: TransactionElementProps) {
  const { name, category, amount, date, avatar } = props;
  return (
    <li className={styles.transactionElement}>
      <div className={styles.transactionElement__header}>
        <Image
          src={avatar}
          alt=""
          width={40}
          height={40}
          className={styles.transactionElement__header_avatar}
        />
        <div className={styles.transactionElement__header_info}>
          <h2 className={styles.transactionElement__header_name}>{name}</h2>
          <p className={styles.transactionElement__header_category}>
            {category}
          </p>
        </div>
      </div>
      <div className={styles.transactionElement__data}>
        <p
          className={`${styles.transactionElement__data_amount} ${
            amount > 0 ? styles.transactionElement__data_amount_positive : ""
          }`}
        >
          {formatCurrencyNumber(amount, true)}
        </p>
        <time className={styles.transactionElement__data_date}>
          {new Date(date).toLocaleDateString()}
        </time>
      </div>
    </li>
  );
}

export default function TransactionsList({
  transactions,
}: {
  transactions: Data["transactions"];
}) {
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;

  const numberOfPages = Math.ceil(transactions.length / 10);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <section className={styles.transactionsListContainer}>
      <ul className={styles.transactionsList}>
        {transactions
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((transaction, index) => (
            <TransactionElement
              key={index}
              name={transaction.name}
              category={transaction.category}
              amount={transaction.amount}
              date={transaction.date}
              avatar={transaction.avatar}
            />
          ))}
      </ul>
      <Pagination
        numberOfPages={numberOfPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
    </section>
  );
}
