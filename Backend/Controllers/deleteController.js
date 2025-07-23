import BankModel from "../Models/BankSchema.js";

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params; // Get the account ID from the URL

    const account = await BankModel.findByIdAndDelete(id);

    if (!account) {
      res.status(404).json({
        message: "Bank account not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Bank account deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

export default deleteAccount;
