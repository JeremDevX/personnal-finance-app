"use client";

import useWindowDimensions from "@/utils/hooks";
import { Icons } from "../icons/Icons";
import styles from "./Pagination.module.scss";

function PaginationButton({
  currentPage,
  onPageChange,
  isPrevious,
  numberOfPages,
}: {
  currentPage: number;
  onPageChange: (newPage: number) => void;
  isPrevious: boolean;
  numberOfPages: number;
}) {
  const isDisabled = isPrevious
    ? currentPage === 1
    : currentPage === numberOfPages;

  const buttonClasses = `${styles.pagination__button} ${
    isDisabled ? styles.pagination__disabled : ""
  }`;

  const handleClick = () => {
    const newPage = isPrevious ? currentPage - 1 : currentPage + 1;
    if (!isDisabled) onPageChange(newPage);
  };
  return (
    <button
      className={buttonClasses}
      disabled={isDisabled}
      onClick={handleClick}
    >
      {isPrevious ? (
        <>
          <Icons.CaretLeft />
          <span>Previous</span>
        </>
      ) : (
        <>
          <span>Next</span>
          <Icons.CaretRight />
        </>
      )}
    </button>
  );
}

export default function Pagination({
  numberOfPages,
  currentPage,
  onPageChange,
}: {
  numberOfPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}) {
  const windowWidth = useWindowDimensions().width;

  const elements = Array.from(
    { length: numberOfPages },
    (_, index) => index + 1
  );

  const getAdjustedPage = () => {
    if (currentPage === 1) return currentPage + 1;
    if (currentPage === numberOfPages) return currentPage - 1;
    return currentPage;
  };

  const adjustedPage = getAdjustedPage();

  return (
    <div className={styles.pagination}>
      <PaginationButton
        currentPage={currentPage}
        onPageChange={onPageChange}
        isPrevious={true}
        numberOfPages={numberOfPages}
      />
      <ul className={styles.pagination__list}>
        {windowWidth > 767 || elements.length < 3 ? (
          elements.map((num) => (
            <li
              key={num}
              onClick={() => onPageChange(num)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onPageChange(num);
              }}
              className={`${styles.pagination__list_item} ${
                num === currentPage ? styles.pagination__list_item_active : ""
              }`}
              tabIndex={0}
            >
              {num}
            </li>
          ))
        ) : (
          <>
            <li
              onClick={() => onPageChange(1)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onPageChange(1);
              }}
              className={`${styles.pagination__list_item} ${
                1 === currentPage ? styles.pagination__list_item_active : ""
              }`}
              tabIndex={0}
            >
              1
            </li>
            {currentPage >= numberOfPages - 1 && (
              <li
                className={`${styles.pagination__list_item} ${styles.pagination__disabled}`}
              >
                ...
              </li>
            )}
            <li
              onClick={() => onPageChange(adjustedPage)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onPageChange(adjustedPage);
              }}
              className={`${styles.pagination__list_item} ${
                adjustedPage === currentPage
                  ? styles.pagination__list_item_active
                  : ""
              }`}
              tabIndex={0}
            >
              {adjustedPage}
            </li>
            {currentPage < numberOfPages - 1 && (
              <li
                className={`${styles.pagination__list_item} ${styles.pagination__disabled}`}
              >
                ...
              </li>
            )}
            <li
              onClick={() => onPageChange(numberOfPages)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onPageChange(numberOfPages);
              }}
              className={`${styles.pagination__list_item} ${
                numberOfPages === currentPage
                  ? styles.pagination__list_item_active
                  : ""
              }`}
              tabIndex={0}
            >
              {numberOfPages}
            </li>
          </>
        )}
      </ul>
      <PaginationButton
        currentPage={currentPage}
        onPageChange={onPageChange}
        isPrevious={false}
        numberOfPages={numberOfPages}
      />
    </div>
  );
}
