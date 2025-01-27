import express from 'express';
import {
  addBankAccount,
  getBankAccounts,
  updateBankAccount,
  deleteBankAccount,
} from '../controllers/bankController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { validateBankAccount } from '../middlewares/validationMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, validateBankAccount, addBankAccount);
router.get('/', authMiddleware, getBankAccounts);
router.put('/:id', authMiddleware, validateBankAccount, updateBankAccount);
router.delete('/:id', authMiddleware, deleteBankAccount);

export default router;
