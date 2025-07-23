import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAccount } from "../Context/AccountContext";
import { handleError, handleSuccess } from "./Notify/Notification";

function EditAccount() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { accounts, setAccounts } = useAccount();

  const [formData, setFormData] = useState({
    bankName: "",
    holderName: "",
    accountNo: "",
    ifsc: "",
    branchName: "",
  });

  useEffect(() => {
    if (!id || accounts.length === 0) return;

    const accountToEdit = accounts.find(
      (acc) => acc?._id?.toString() === id?.toString()
    );
    if (accountToEdit) {
      console.log("Editing account:", accountToEdit);
      setFormData(accountToEdit);
    } else {
      console.warn("Account not found for id:", id);
    }
  }, [id, accounts]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const { _id, ...formWithoutId } = formData;
      const res = await fetch(`http://localhost:4000/bank/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formWithoutId),
      });

      const result = await res.json();
      console.log("Update result:", result);
      console.log("Sending PUT request for ID:", id);
      console.log("Payload:", formWithoutId);
      if (result.success) {
        const updatedList = accounts.map((acc) =>
          acc?._id?.toString() === id ? result.updatedAccount : acc
        );
        setAccounts(updatedList);
        localStorage.setItem("accounts", JSON.stringify(updatedList));
        handleSuccess(result.message || "Account updated successfully.");
        navigate("/dashboard");
      } else {
        handleError(result.message || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      handleError("Something went wrong while updating.");
    }
  };

  return (
    <div className="account-container">
      <div className="heading">
        <h4>Edit Your Bank Account Details</h4>
      </div>

      <div className="account-detail">
        <form onSubmit={handleSave}>
          <div className="field">
            <label htmlFor="accountholder">Bank Name</label>
            <input
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              type="text"
              placeholder="Enter Bank Name"
            />
          </div>
          <div className="field">
            <label htmlFor="accountholder">Account Name</label>
            <input
              name="holderName"
              value={formData.holderName}
              onChange={handleChange}
              type="text"
              placeholder="Enter Account Name"
            />
          </div>
          <div className="field">
            <label htmlFor="accountno.">Account Number</label>
            <input
              name="accountNo"
              value={formData.accountNo}
              onChange={handleChange}
              type="text"
              placeholder="Enter Account Number"
            />
          </div>
          <div className="field">
            <label htmlFor="ifsc">IFSC Code</label>
            <input
              name="ifsc"
              value={formData.ifsc}
              onChange={handleChange}
              type="text"
              placeholder="Enter IFSC Code"
            />
          </div>
          <div className="field">
            <label htmlFor="branch">Branch Name</label>
            <input
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              type="text"
              placeholder="Enter Branch Name"
            />
          </div>

          <div className="update-button">
            <button type="submit" className="btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAccount;
