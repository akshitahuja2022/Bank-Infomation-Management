import BankModel from "../Models/BankSchema.js";

const addAccount = async (req, res) => {
  try {
    const { bankName, holderName, accountNo, ifsc, branchName, email } =
      req.body;

    const existBank = await BankModel.findOne({ accountNo });

    if (existBank) {
      return res.status(409).json({
        message: "Bank Account already exist.",
        success: false,
      });
    }

    const bankModel = new BankModel({
      bankName,
      holderName,
      accountNo,
      ifsc,
      branchName,
      email,
    });

    console.log("ID to update:", req.params.id);
    console.log("Update data:", req.body);

    await bankModel.save();
    return res.status(200).json({
      message: "Bank Account added Successfully",
      success: true,
      account: {
        bankName: bankModel.bankName,
        holderName: bankModel.holderName,
        accountNo: bankModel.accountNo,
        ifsc: bankModel.ifsc,
        branchName: bankModel.branchName,
        email: bankModel.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export default addAccount;
