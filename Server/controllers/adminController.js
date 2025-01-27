import User from '../models/userModel.js';
import BankAccount from '../models/bankModel.js';

// Retrieve all users without passwords
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Retrieve all bank accounts with user information
const getAllBankAccounts = async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find().populate('user', 'username email');
    res.status(200).json(bankAccounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Search users by username or email and bank accounts by bank details
const searchUsers = async (req, res) => {
  const { query } = req.params;

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    }).select('-password');

    const bankAccounts = await BankAccount.find({
      $or: [
        { ifscCode: { $regex: query, $options: 'i' } },
        { branchName: { $regex: query, $options: 'i' } },
        { bankName: { $regex: query, $options: 'i' } },
        { accountNumber: { $regex: query, $options: 'i' } },
        { accountHolderName: { $regex: query, $options: 'i' } },
      ],
    }).populate('user', 'username email');

    res.status(200).json({ users, bankAccounts });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { getAllUsers, getAllBankAccounts, searchUsers };
