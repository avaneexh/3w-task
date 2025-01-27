import express from 'express';
import { getAllUsers, getAllBankAccounts, searchUsers } from '../controllers/adminController.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/users', adminMiddleware, getAllUsers);
router.get('/bank-accounts',  adminMiddleware, getAllBankAccounts);
router.get('/search/:query',  adminMiddleware, searchUsers);

export default router;
