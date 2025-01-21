"use client";

import useWindowDimensions from "@/utils/hooks";
import styles from "./SortDropdown.module.scss";
import { Icons } from "../icons/Icons";
import { useEffect, useState } from "react";

interface SortDropdownProps {
  categories: string[];
  onCategoryChange: (sort: string) => void;
}

export default function SortByCategoryDropdown(props: SortDropdownProps) {
  const { categories, onCategoryChange } = props;
  const windowWidth = useWindowDimensions().width;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleOpenMenu = () => {
    setIsMenuOpen((prev) => !prev);
    if (!isMenuOpen) {
      (document.activeElement as HTMLElement)?.blur();
    }
  };

  const handleChangeSelectedCategory = (category: string) => {
    setSelectedCategory(category);
    setIsMenuOpen(false);
    onCategoryChange(category);
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
        <Icons.FilterMobile
          className={styles.sortDropdown__mobile}
          onClick={handleOpenMenu}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !isMenuOpen) {
              handleOpenMenu();
            }
          }}
          tabIndex={0}
          aria-label="Open category menu"
          role="button"
        />
      ) : (
        <div className={styles.sortDropdown__desktop}>
          <span>Category</span>
          <div
            className={styles.sortDropdown__desktop_dropdown}
            onClick={handleOpenMenu}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !isMenuOpen) {
                handleOpenMenu();
              }
            }}
            tabIndex={0}
            aria-label="Open category menu"
            role="button"
          >
            {selectedCategory === "All" ? "All Transactions" : selectedCategory}
            <Icons.CaretDown />
          </div>
        </div>
      )}
      {isMenuOpen && (
        <ul
          className={`${styles.sortDropdown__menu} ${styles.sortDropdown__menu_categories}`}
          aria-label="Sorting options"
          aria-expanded={isMenuOpen}
          role="menu"
        >
          {Object.values(categories).map((category, index) => (
            <li
              id={`sort-item${index}`}
              key={category}
              className={`${styles.sortDropdown__item} ${
                category === selectedCategory
                  ? styles.sortDropdown__item_selected
                  : ""
              }`}
              onClick={() => handleChangeSelectedCategory(category)}
              onKeyDown={(event) => {
                if (event.key === "Enter")
                  handleChangeSelectedCategory(category);
              }}
              aria-label={category}
              aria-selected={category === selectedCategory}
              tabIndex={0}
              role="menuitem"
            >
              {category === "All" ? "All Transactions" : category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
