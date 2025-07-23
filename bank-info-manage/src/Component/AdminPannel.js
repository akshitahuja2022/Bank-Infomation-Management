import React, { useEffect } from "react";
import { useAccount } from "../Context/AccountContext";

function AdminPannel() {
  const { accounts, setAccounts } = useAccount();

  useEffect(() => {
    fetchAccounts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAccounts = async () => {
    const response = await fetch("http://localhost:4000/getAccounts");
    const data = await response.json();
    setAccounts(data);
  };

  return (
    <div className="dashboard-container">
      <div className="heading">
        <h3>Admin Panel -- User Bank Accounts</h3>
      </div>

      <div className="bank-details">
        <table>
          <thead>
            <tr>
              <th>BankName</th>
              <th>Account's Holder Name</th>
              <th>Account Number</th>
              <th>Ifsc</th>
              <th>Branch Name</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc, index) => {
              return (
                <tr key={acc._id}>
                  <td className="border p-2 text-center">{acc.bankName}</td>
                  <td className="border p-2 text-center">{acc.holderName}</td>
                  <td className="border p-2 text-center">{acc.accountNo}</td>
                  <td className="border p-2 text-center">{acc.ifsc}</td>
                  <td className="border p-2 text-center">{acc.branchName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPannel;
