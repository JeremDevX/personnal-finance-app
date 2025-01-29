"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Data } from "@/utils/interfaces";

type ModalType = "edit" | "delete";

interface ModalData<T> {
  type: ModalType;
  data: T;
  allreadyUsedColors?: string[];
}

interface ModalContextProps<T> {
  isOpen: boolean;
  modalData: ModalData<T> | null;
  globalData: Data["budgets"] | Data["pots"];
  setGlobalData: (data: Data["budgets"] | Data["pots"]) => void;
  openModal: (type: ModalType, data: T, allreadyUsedColors?: string[]) => void;
  closeModal: () => void;
}

const ModalContext = createContext<
  ModalContextProps<Data["budgets"][0] | Data["pots"][0]> | undefined
>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState<ModalData<
    Data["budgets"][0] | Data["pots"][0]
  > | null>(null);
  const [globalData, setGlobalData] = useState<Data["budgets"] | Data["pots"]>(
    []
  );

  const openModal = (
    type: ModalType,
    data: Data["budgets"][0] | Data["pots"][0],
    allreadyUsedColors?: string[]
  ) => {
    setModalData({ type, data, allreadyUsedColors });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalData(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalData,
        openModal,
        closeModal,
        globalData,
        setGlobalData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
