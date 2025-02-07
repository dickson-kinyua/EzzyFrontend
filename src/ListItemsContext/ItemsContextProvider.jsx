import { useState } from "react";
import { ItemsContext } from "./ItemsContext";

export const ItemsContextProvider = ({ children }) => {
  const [ListItems, setListItems] = useState([]);

  return (
    <ItemsContext.Provider value={{ ListItems, setListItems }}>
      {children}
    </ItemsContext.Provider>
  );
};
