"use client";

import { useModal } from "@/context/ModalContext";
import { Icons } from "../icons/Icons";
import styles from "./DropdownEditDelete.module.scss";
import { Data } from "@/utils/interfaces";
import { useState } from "react";

interface DropdownEditDeleteProps {
  type: "budgets" | "pots";
  data: Data["budgets"][0] | Data["pots"][0];
  allreadyUsedColors?: string[];
}

export default function DropdownEditDelete({
  type,
  data,
  allreadyUsedColors,
}: DropdownEditDeleteProps) {
  const { openModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Icons.Ellipsis
        className={styles.ellipsis}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <div className={styles.dropdown}>
          <button
            className={styles.dropdown__button}
            onClick={() => {
              openModal("edit", data, allreadyUsedColors);
              setIsOpen(false);
            }}
          >
            Edit {type === "budgets" ? "Budget" : "Pot"}
          </button>
          <button
            className={styles.dropdown__button}
            onClick={() => {
              openModal("delete", data);
              setIsOpen(false);
            }}
          >
            Delete {type === "budgets" ? "Budget" : "Pot"}
          </button>
        </div>
      )}
    </>
  );
}
