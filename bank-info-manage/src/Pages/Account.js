import React, { useState } from "react";
import "./Account.css";
import { useUser } from "../Context/AuthContext";
import { useAccount } from "../Context/AccountContext";
import { handleSuccess, handleError } from "../Component/Notify/Notification";
import { useNavigate } from "react-router-dom";
function Account() {
  const navigate = useNavigate();

  const [newAccount, setNewAccount] = useState({
    bankName: "",
    holderName: "",
    accountNo: "",
    ifsc: "",
    branchName: "",
  });
  const { user } = useUser();
  const { setIsAccount, accounts, setAccounts } = useAccount();

  const addAccount = async () => {
    const payload = { ...newAccount, email: user.email };

    try {
      const response = await fetch(
        "https://bank-infomation-management.vercel.app/bank/add",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      const { message, success, error } = result;
      if (success) {
        setIsAccount(true);
        handleSuccess(message);
        setTimeout(() => navigate("/dashboard"), 2000);

        setAccounts((prev) => [...prev, result.account]);
        localStorage.setItem(
          "accounts",
          JSON.stringify([...accounts, result.account])
        );
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!error) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
      console.log("error", error);
    }
  };

  return (
    <div className="account-container">
      <div className="heading">
        <h4>Add Bank Account</h4>
      </div>

      <div className="account-detail">
        <form>
          <div className="field">
            <label htmlFor="accountholder">Bank Name</label>
            <input
              value={newAccount.bankName}
              onChange={(e) =>
                setNewAccount({ ...newAccount, bankName: e.target.value })
              }
              type="text"
              placeholder="Enter Bank Name"
            />
          </div>
          <div className="field">
            <label htmlFor="accountholder">Account's Holder Name</label>
            <input
              value={newAccount.holderName}
              onChange={(e) =>
                setNewAccount({ ...newAccount, holderName: e.target.value })
              }
              type="text"
              placeholder="Enter Account Name"
            />
          </div>
          <div className="field">
            <label htmlFor="accountno.">Account Number</label>
            <input
              value={newAccount.accountNo}
              onChange={(e) =>
                setNewAccount({ ...newAccount, accountNo: e.target.value })
              }
              type="text"
              placeholder="Enter Account Number"
            />
          </div>
          <div className="field">
            <label htmlFor="ifsc">IFSC Code</label>
            <input
              value={newAccount.ifsc}
              onChange={(e) =>
                setNewAccount({ ...newAccount, ifsc: e.target.value })
              }
              type="text"
              placeholder="Enter IFSC Code"
            />
          </div>
          <div className="field">
            <label htmlFor="branch">Branch Name</label>
            <input
              value={newAccount.branchName}
              onChange={(e) =>
                setNewAccount({ ...newAccount, branchName: e.target.value })
              }
              type="text"
              placeholder="Enter Branch Name"
            />
          </div>
        </form>
        <div className="button">
          <button onClick={addAccount} className="btn">
            Add Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Account;
