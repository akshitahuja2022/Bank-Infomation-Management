import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "../Context/AuthContext";
// create the context
const AccountContext = createContext();

// create provider component

export const AccountProvider = ({ children }) => {
  const { user } = useUser();
  const [accounts, setAccounts] = useState([]);
  const [isAccount, setIsAccount] = useState(false);

  useEffect(() => {
    if (!user.email) return;
    const fetchAccounts = async () => {
      try {
        const res = await fetch(
          `https://bank-infomation-management.vercel.app/bank/accounts?email=${encodeURIComponent(
            user.email
          )}`
        );
        const data = await res.json();
        if (data.success) {
          setAccounts(data.accounts);
          localStorage.setItem("accounts", JSON.stringify(data.accounts));
        }
      } catch (e) {
        console.error("Fetch accounts failed:", e);
      }
    };
    fetchAccounts();
  }, [user.email]);

  return (
    <AccountContext.Provider
      value={{
        accounts,
        setAccounts,
        isAccount,
        setIsAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};

// create custom hook to useContext
export const useAccount = () => useContext(AccountContext);
