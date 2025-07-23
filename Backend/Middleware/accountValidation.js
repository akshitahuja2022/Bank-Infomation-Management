import Joi from "joi";

const accountValidation = async (req, res, next) => {
  const schema = Joi.object({
    bankName: Joi.string().max(100).required(),
    holderName: Joi.string().max(100).required(),
    accountNo: Joi.string().min(11).max(16).required(),
    ifsc: Joi.string().min(11).max(11).required(),
    branchName: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

export default accountValidation;
