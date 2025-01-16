"use client";

import { Icons } from "@/components/icons/Icons";
import styles from "./SearchBar.module.scss";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (search: string) => void;
}

export default function SearchBar(props: SearchBarProps) {
  const { onSearch } = props;
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setQuery(query);
  };

  const handleSubmitSearch = (
    query: string,
    event?: React.FormEvent<HTMLFormElement>
  ) => {
    if (event) {
      event.preventDefault();
    }
    onSearch(query.trim());
  };

  return (
    <form
      className={styles.searchBar}
      onSubmit={(event) => handleSubmitSearch(query, event)}
    >
      <input
        type="text"
        placeholder="Search transaction"
        className={styles.searchBar__input}
        onChange={handleInputChange}
      />
      <Icons.Search
        className={styles.searchBar__icon}
        onClick={() => handleSubmitSearch(query)}
      />
    </form>
  );
}
