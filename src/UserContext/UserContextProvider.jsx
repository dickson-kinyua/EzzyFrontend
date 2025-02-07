import { useState } from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [logged, setLogged] = useState({});

  return (
    <UserContext.Provider value={{ logged, setLogged }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
