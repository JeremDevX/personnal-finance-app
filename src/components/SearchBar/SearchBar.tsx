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
    event: React.FormEvent<HTMLFormElement>,
    query: string
  ) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form
      className={styles.searchBar}
      onSubmit={(event) => handleSubmitSearch(event, query)}
    >
      <input
        type="text"
        placeholder="Search transaction"
        className={styles.searchBar__input}
        onChange={handleInputChange}
      />
      <Icons.Search className={styles.searchBar__icon} />
    </form>
  );
}
