import React, { useState, createContext } from "react";

const DEFAULT_VALUE = {
  setSelectedRow: () => {},
  setOpen: () => {},
  setMenuName: () => {},
  open: false,
  selectedRow: undefined,
  menuName: [0, "Clientes"],
};

export const DataContext = createContext<any>(DEFAULT_VALUE);

export const DataProvider: React.FC = ({ children }) => {
  const [selectedRow, setSelectedRow] = useState(DEFAULT_VALUE.selectedRow);
  const [open, setOpen] = useState(DEFAULT_VALUE.open);
  const [menuName, setMenuName] = useState(DEFAULT_VALUE.open);

  return (
    <DataContext.Provider
      value={{
        selectedRow,
        setSelectedRow,
        open,
        setOpen,
        menuName,
        setMenuName,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
