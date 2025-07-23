import BankModel from "../Models/BankSchema.js";

const getAccountsByEmail = async (req, res) => {
  const { email } = req.query;
  if (!email)
    res.status(400).json({ message: "Email is required", success: false });

  try {
    const accounts = await BankModel.find({ email });
    res.status(200).json({ success: true, accounts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default getAccountsByEmail;
