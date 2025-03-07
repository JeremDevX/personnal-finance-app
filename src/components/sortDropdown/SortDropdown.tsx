"use client";

import useWindowDimensions from "@/utils/hooks";
import styles from "./SortDropdown.module.scss";
import { Icons } from "../icons/Icons";
import { useEffect, useState } from "react";

interface SortDropdownProps {
  onSort: (sort: string) => void;
}

const sortType = [
  { value: "latest", label: "Latest", ariaLabel: "Sort by latest" },
  { value: "oldest", label: "Oldest", ariaLabel: "Sort by oldest" },
  { value: "aToZ", label: "A to Z", ariaLabel: "Sort by alphabetical order" },
  {
    value: "zToA",
    label: "Z to A",
    ariaLabel: "Sort by reverse alphabetical order",
  },
  { value: "highest", label: "Highest", ariaLabel: "Sort by highest amount" },
  { value: "lowest", label: "Lowest", ariaLabel: "Sort by lowest amount" },
];

export default function SortDropdown(props: SortDropdownProps) {
  const { onSort } = props;
  const windowWidth = useWindowDimensions().width;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortType[0]);

  const handleOpenMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (!isMenuOpen) {
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  const handleChangeSelectedSort = (sort: (typeof sortType)[0]) => {
    setSelectedSort(sort);
    setIsMenuOpen(false);
    onSort(sort.value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div className={styles.sortDropdown}>
      {windowWidth < 768 ? (
        <Icons.SortMobile
          className={styles.sortDropdown__mobile}
          onClick={handleOpenMenu}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !isMenuOpen) {
              handleOpenMenu();
            }
          }}
          tabIndex={0}
          aria-label="Open sorting menu"
          role="button"
        />
      ) : (
        <div className={styles.sortDropdown__desktop}>
          <span>Sort by</span>
          <div
            className={styles.sortDropdown__desktop_dropdown}
            onClick={handleOpenMenu}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !isMenuOpen) {
                handleOpenMenu();
              }
            }}
            tabIndex={0}
            aria-label="Open sorting menu"
            role="button"
          >
            {selectedSort.label}
            <Icons.CaretDown />
          </div>
        </div>
      )}
      {isMenuOpen && (
        <ul
          className={styles.sortDropdown__menu}
          aria-label="Sorting options"
          aria-expanded={isMenuOpen}
          role="menu"
        >
          {Object.values(sortType).map((sort) => (
            <li
              key={sort.value}
              className={`${styles.sortDropdown__item} ${
                sort.value === selectedSort.value
                  ? styles.sortDropdown__item_selected
                  : ""
              }`}
              onClick={() => handleChangeSelectedSort(sort)}
              onKeyDown={(event) => {
                if (event.key === "Enter") handleChangeSelectedSort(sort);
              }}
              aria-label={sort.ariaLabel}
              aria-selected={sort.value === selectedSort.value}
              tabIndex={0}
              role="menuitem"
            >
              {sort.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
