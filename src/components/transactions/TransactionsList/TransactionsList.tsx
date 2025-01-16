"use client";

import { Data } from "@/utils/interfaces";
import styles from "./TransactionsList.module.scss";
import { useState } from "react";
import Image from "next/image";
import { formatCurrencyNumber } from "@/utils/functions";
import Pagination from "@/components/pagination/Pagination";
import SearchBar from "../../SearchBar/SearchBar";
import { Icons } from "@/components/icons/Icons";

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
  const [transactionsList, setTransactionsList] = useState(transactions);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;

  const numberOfPages = Math.ceil(transactionsList.length / 10);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchTransaction = (query: string) => {
    const filteredTransactions = transactions.filter((transaction) =>
      transaction.name.toLowerCase().includes(query.toLowerCase())
    );
    setTransactionsList(filteredTransactions);
  };

  return (
    <section className={styles.transactionsListContainer}>
      <div className={styles.transactionsListContainer__header}>
        <SearchBar onSearch={handleSearchTransaction} />
        <div className={styles.transactionsListContainer__header_filters}>
          <Icons.SortMobile className={styles.icon} />
          <Icons.FilterMobile className={styles.icon} />
        </div>
      </div>
      <ul className={styles.transactionsList}>
        {transactionsList
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
