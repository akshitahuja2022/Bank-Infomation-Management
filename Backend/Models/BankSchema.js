import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  holderName: { type: String, required: true },
  accountNo: {
    type: String,
    minLength: 11,
    maxLength: 16,
    require: true,
    unique: true,
  },
  ifsc: { type: String, minLength: 11, required: true },
  branchName: { type: String, required: true },
  email: { type: String, required: true },
});

const BankModel = mongoose.model("bank-accounts", bankSchema);
export default BankModel;
