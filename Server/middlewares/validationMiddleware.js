import { check, validationResult } from 'express-validator';

const validateUserRegistration = [
  check('username').not().isEmpty().withMessage('Username is required'),
  check('email').isEmail().withMessage('Please include a valid email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

const validateBankAccount = [
  check('ifscCode').not().isEmpty().withMessage('IFSC Code is required'),
  check('branchName').not().isEmpty().withMessage('Branch Name is required'),
  check('bankName').not().isEmpty().withMessage('Bank Name is required'),
  check('accountNumber').not().isEmpty().withMessage('Account Number is required'),
  check('accountHolderName').not().isEmpty().withMessage('Account Holder Name is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export { validateUserRegistration, validateBankAccount };
