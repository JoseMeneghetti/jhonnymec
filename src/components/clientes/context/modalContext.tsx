import React, { useState, createContext } from "react";

const DEFAULT_VALUE = {
    setSelectedRow: () => {},
    setOpen: () => {},
    open: false,
    selectedRow : undefined
  };

export const ModalClientContext = createContext<any>(DEFAULT_VALUE);

export const ModalClientProvider: React.FC = ({ children }) => {
  const [selectedRow, setSelectedRow] = useState(DEFAULT_VALUE.selectedRow);
  const [open, setOpen] = useState(DEFAULT_VALUE.open);

  return (
    <ModalClientContext.Provider
      value={{ selectedRow, setSelectedRow, open, setOpen }}
    >
      {children}
    </ModalClientContext.Provider>
  );
};
