import React, { useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/AuthContext";
import { useAccount } from "../Context/AccountContext";
import { handleError, handleSuccess } from "./Notify/Notification";

function Dashboard() {
  const navigate = useNavigate();
  const { isLogin, user } = useUser();
  const { accounts, setAccounts } = useAccount();

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [actionIndex, setActionIndex] = useState(null);

  const userAccounts = accounts.filter((acc) => acc.email === user.email);

  const handleDelete = async () => {
    if (!selectedAccount) {
      handleError("No account selected for deletion");
      return;
    }
    console.log("Deleting account with ID:", selectedAccount?._id);

    try {
      const res = await fetch(
        `https://bank-infomation-management.vercel.app/bank/account/${selectedAccount._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success) {
        const updated = accounts.filter(
          (acc) => acc._id !== selectedAccount._id
        );
        setAccounts(updated);
        localStorage.setItem("accounts", JSON.stringify(updated));
        handleSuccess(data.message);
        setSelectedAccount(null);
        setActionIndex(null);
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError(error.message || "Error deleting account");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="heading">
        <h3>Bank Accounts</h3>
        <button
          onClick={() => navigate(isLogin ? "/account" : "/signup")}
          className="btn"
        >
          Add Account
        </button>
      </div>

      <div className="bank-details">
        <table>
          <thead>
            <tr>
              <th>Bank</th>
              <th>Account's Holder Name</th>
              <th>Account Number</th>
              <th>IFSC Code</th>
              <th>Branch Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLogin && userAccounts.length > 0 ? (
              userAccounts.map((acc, index) => (
                <React.Fragment key={acc._id}>
                  <tr>
                    <td>{acc.bankName}</td>
                    <td>{acc.holderName}</td>
                    <td>{acc.accountNo}</td>
                    <td>{acc.ifsc}</td>
                    <td>{acc.branchName}</td>
                    <td
                      onClick={() => {
                        setActionIndex(index === actionIndex ? null : index);
                        setSelectedAccount(acc);
                      }}
                      className="details"
                      style={{ cursor: "pointer" }}
                    >
                      ...
                    </td>
                  </tr>
                  {actionIndex === index && (
                    <tr>
                      <td colSpan="6">
                        <div className="actions">
                          <p
                            onClick={() => navigate(`/edit/${acc._id}`)}
                            className="para"
                          >
                            Edit Details
                          </p>
                          <p onClick={handleDelete} className="para">
                            Delete Account
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No Bank Account Added Yet. Click "Add Account" to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
