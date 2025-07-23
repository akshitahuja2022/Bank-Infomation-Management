import express from "express";
import accountValidation from "../Middleware/accountValidation.js";
import addAccount from "../Controllers/accountControllers.js";
import getAccountsByEmail from "../Controllers/getAccount.js";
import deleteAccount from "../Controllers/deleteController.js";
import BankModel from "../Models/BankSchema.js";

const bankrouter = express.Router();

bankrouter.get("/accounts", getAccountsByEmail);
bankrouter.post("/add", accountValidation, addAccount);

// delete account
bankrouter.delete("/account/:id", deleteAccount);

// edit account
bankrouter.put("/edit/:id", async (req, res) => {
  try {
    const updated = await BankModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json({
      success: true,
      message: "Updated successfully",
      updatedAccount: updated,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Update failed", error: err.message });
  }
});

export default bankrouter;
