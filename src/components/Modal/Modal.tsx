"use client";

import { useModal } from "@/context/ModalContext";
import styles from "./Modal.module.scss";
import { Icons } from "../icons/Icons";
import { useState } from "react";
import { Data } from "@/utils/interfaces";
import { formatCurrencyNumber } from "@/utils/functions";

const colorsList: Record<string, string> = {
  "#277C78": "Green",
  "#F2CDAC": "Yellow",
  "#82C9D7": "Cyan",
  "#626070": "Navy",
  "#C94736": "Red",
  "#826CB0": "Purple",
  "#AF81BA": "Purple Light",
  "#597C7C": "Turquoise",
  "#93674F": "Brown",
  "#934F6F": "Magenta",
  "#3F82B2": "Blue",
  "#97A0AC": "Navy Grey",
  "#7F9161": "Army Green",
  "#CAB361": "Gold",
  "#BE6C49": "Orange",
};

export default function Modal() {
  const { isOpen, modalData, closeModal } = useModal();

  if (!isOpen || !modalData) return null;

  const { type, data, allreadyUsedColors } = modalData;
  const isBudget = "category" in data;

  return (
    <ModalWrapper closeModal={closeModal}>
      {type === "delete" ? (
        <DeleteModal
          isBudget={isBudget}
          data={data as Data["budgets"][0] | Data["pots"][0]}
          closeModal={closeModal}
        />
      ) : (
        <EditModal
          isBudget={isBudget}
          data={data as Data["budgets"][0] | Data["pots"][0]}
          closeModal={closeModal}
          allreadyUsedColors={allreadyUsedColors ? allreadyUsedColors : []}
        />
      )}
    </ModalWrapper>
  );
}

function ModalWrapper({
  children,
  closeModal,
}: {
  children: React.ReactNode;
  closeModal: () => void;
}) {
  return (
    <div className={styles.modalOverlay} onClick={closeModal}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

function DeleteModal({
  isBudget,
  data,
  closeModal,
}: {
  isBudget: boolean;
  data: Data["budgets"][0] | Data["pots"][0];
  closeModal: () => void;
}) {
  const name = isBudget
    ? (data as Data["budgets"][0]).category
    : (data as Data["pots"][0]).name;

  return (
    <>
      <div className={styles.modal__header}>
        <h2 className={styles.modal__title}>Delete "{name}"?</h2>
        <Icons.CloseModal onClick={closeModal} className={styles.modal__icon} />
      </div>
      <p className={styles.modal__description}>
        Are you sure you want to delete this {isBudget ? "budget" : "pot"}? This
        action cannot be undone.
      </p>
      <div className={styles.deleteActions}>
        <button className={styles.deleteActions__confirm}>
          Yes, Confirm Deletion
        </button>
        <button className={styles.deleteActions__cancel} onClick={closeModal}>
          No, I want to go back
        </button>
      </div>
    </>
  );
}

function EditModal({
  isBudget,
  data,
  closeModal,
  allreadyUsedColors,
}: {
  isBudget: boolean;
  data: Data["budgets"][0] | Data["pots"][0];
  closeModal: () => void;
  allreadyUsedColors: string[];
}) {
  const budgetData = isBudget ? (data as Data["budgets"][0]) : null;
  const potData = !isBudget ? (data as Data["pots"][0]) : null;

  return (
    <>
      <div className={styles.modal__header}>
        <h2 className={styles.modal__title}>
          Edit {isBudget ? "Budget" : "Pot"}
        </h2>
        <Icons.CloseModal onClick={closeModal} className={styles.modal__icon} />
      </div>
      <p className={styles.modal__description}>
        {isBudget
          ? "As your budgets change, feel free to update your spending limits"
          : ""}
      </p>
      <div className={styles.editForm}>
        <label className={styles.editLabel}>
          {isBudget ? "Budget Category" : "Name"}:
          <select name="category">
            <option value={isBudget ? budgetData?.category : potData?.name}>
              {isBudget ? budgetData?.category : potData?.name}
            </option>
          </select>
        </label>

        <label className={styles.editLabel}>
          {isBudget ? "Maximum Spend" : "Saved Amount"}:
          <input
            type="text"
            placeholder={formatCurrencyNumber(
              isBudget ? budgetData?.maximum ?? 0 : potData?.total ?? 0
            )}
          />
        </label>

        <label className={styles.editLabel}>
          Select New Theme:
          <ColorDropdown
            currentTheme={data.theme}
            allreadyUsedColors={allreadyUsedColors}
          />
        </label>
      </div>

      <div className={styles.editAction}>
        <button className={styles.editAction__button}>Save Changes</button>
      </div>
    </>
  );
}

function ColorDropdown({
  currentTheme,
  allreadyUsedColors,
}: {
  currentTheme: string;
  allreadyUsedColors: string[];
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>(currentTheme);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSelectColor = (color: string) => {
    if (allreadyUsedColors.includes(color)) return;
    setSelectedColor(color);
    setIsDropdownOpen(false);
  };

  return (
    <div className={styles.colorDropdown}>
      <button
        onClick={handleToggleDropdown}
        className={styles.colorDropdown__button}
      >
        <div
          className={styles.colorDropdown__dot}
          style={{ "--dot-color": selectedColor } as React.CSSProperties}
        ></div>
        {colorsList[selectedColor] || "Select Color"}
        <Icons.CaretDown className={styles.colorDropdown__icon} />
      </button>
      {isDropdownOpen && (
        <ul className={styles.colorDropdown__list}>
          {Object.entries(colorsList).map(([color, name]) => (
            <li
              key={color}
              className={styles.colorDropdown__item}
              onClick={(e) => {
                e.preventDefault();
                handleSelectColor(color);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSelectColor(color);
                }
              }}
              tabIndex={0}
            >
              <div
                className={styles.colorDropdown__dot}
                style={{ "--dot-color": color } as React.CSSProperties}
              ></div>
              {name}
              {allreadyUsedColors.includes(color) && (
                <div className={styles.colorDropdown__usedColor}>
                  Already used
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
