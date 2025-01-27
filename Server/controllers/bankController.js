import BankAccount from '../models/bankModel.js';
import { validationResult } from 'express-validator';

const addBankAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;
  const userId = req.user.id;

  try {
    const bankAccount = new BankAccount({
      user: userId, // Ensure the user ID is set correctly
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName,
    });

    await bankAccount.save();
    res.status(201).json(bankAccount);
  } catch (error) {
    console.error('Error adding bank account:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getBankAccounts = async (req, res) => {
  const userId = req.user.id;

  try {
    const bankAccounts = await BankAccount.find({ user: userId });
    res.status(200).json(bankAccounts);
  } catch (error) {
    console.error('Error fetching bank accounts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateBankAccount = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;
  const userId = req.user.id;

  try {
    const bankAccount = await BankAccount.findOne({ _id: id, user: userId });
    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found' });
    }

    bankAccount.ifscCode = ifscCode;
    bankAccount.branchName = branchName;
    bankAccount.bankName = bankName;
    bankAccount.accountNumber = accountNumber;
    bankAccount.accountHolderName = accountHolderName;

    await bankAccount.save();
    res.status(200).json(bankAccount);
  } catch (error) {
    console.error('Error updating bank account:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteBankAccount = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const bankAccount = await BankAccount.findOne({ _id: id, user: userId });
    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found' });
    }

    await BankAccount.deleteOne({ _id: id, user: userId }); // Use deleteOne method on the model
    res.status(200).json({ message: 'Bank account deleted' });
  } catch (error) {
    console.error('Error deleting bank account:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { addBankAccount, getBankAccounts, updateBankAccount, deleteBankAccount };
