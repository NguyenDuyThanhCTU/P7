import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProviders = ({ children }) => {
  const [verify, setVerify] = useState(false);
  const [accounts, setAccounts] = useState();
  const [users, setUsers] = useState();

  return (
    <AuthContext.Provider
      value={{ verify, setVerify, accounts, setAccounts, users, setUsers }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
