"use client";

import { Data } from "@/utils/interfaces";
import styles from "./TransactionsList.module.scss";
import { useState, useEffect } from "react";
import Image from "next/image";
import { formatCurrencyNumber } from "@/utils/functions";
import Pagination from "@/components/pagination/Pagination";
import SearchBar from "../../SearchBar/SearchBar";
import SortDropdown from "@/components/sortDropdown/SortDropdown";
import SortByCategoryDropdown from "@/components/sortDropdown/SortByCategoryDropdown";

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
  const [query, setQuery] = useState<string>("");
  const [currentSort, setCurrentSort] = useState<string>("latest");
  const [currentCategory, setCurrentCategory] = useState<string>("All");
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;

  const numberOfPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const applyFilters = () => {
    let filtered = transactions;
    if (currentCategory !== "All") {
      filtered = filtered.filter(
        (transaction) => transaction.category === currentCategory
      );
    }

    if (query) {
      filtered = filtered.filter((transaction) =>
        transaction.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    filtered = filtered.sort((a, b) => {
      if (currentSort === "latest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (currentSort === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (currentSort === "aToZ") {
        return a.name.localeCompare(b.name);
      } else if (currentSort === "zToA") {
        return b.name.localeCompare(a.name);
      } else if (currentSort === "highest") {
        return b.amount - a.amount;
      } else if (currentSort === "lowest") {
        return a.amount - b.amount;
      }
      return 0;
    });

    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    applyFilters();
    setPage(1);
  }, [query, currentSort, currentCategory]);

  const handleSearchTransaction = (query: string) => {
    setQuery(query);
  };

  const handleSortTransactions = (sort: string) => {
    setCurrentSort(sort);
  };

  const handleCategoryChange = (category: string) => {
    setCurrentCategory(category);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const transactionCategories = [
    "All",
    ...Array.from(
      new Set(transactions.map((transaction) => transaction.category))
    ),
  ];

  return (
    <section className={styles.transactionsListContainer}>
      <div className={styles.transactionsListContainer__header}>
        <SearchBar onSearch={handleSearchTransaction} />
        <div className={styles.transactionsListContainer__header_filters}>
          <SortDropdown onSort={handleSortTransactions} />
          <SortByCategoryDropdown
            categories={transactionCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>
      <div className={styles.transactionsInfos}>
        <span>Recipient / Sender</span>
        <span>Category</span>
        <span>Transaction Date</span>
        <span>Amount</span>
      </div>
      <ul className={styles.transactionsList}>
        {filteredTransactions
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
