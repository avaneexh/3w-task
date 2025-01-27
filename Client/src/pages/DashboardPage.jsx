import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Modal,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  getBankAccounts,
  addBankAccount,
  updateBankAccount,
  deleteBankAccount,
} from '../services/api'; // Import API services
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  // Form state
  const [form, setForm] = useState({
    ifscCode: '',
    branchName: '',
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
  });

  // Fetch all bank accounts when the component mounts
  const fetchBankAccounts = async () => {
    try {
      const data = await getBankAccounts();
      setBankAccounts(data);
    } catch (err) {
      console.error('Error fetching bank accounts:', err);
    }
  };

  useEffect(() => {
    fetchBankAccounts();
  }, []);

  // Open modal for adding or editing
  const handleOpenModal = (account = null) => {
    setSelectedAccount(account);
    setIsAdding(!account);
    setForm(
      account
        ? {
            ifscCode: account.ifscCode,
            branchName: account.branchName,
            bankName: account.bankName,
            accountNumber: account.accountNumber,
            accountHolderName: account.accountHolderName,
          }
        : {
            ifscCode: '',
            branchName: '',
            bankName: '',
            accountNumber: '',
            accountHolderName: '',
          }
    );
    setIsModalOpen(true);
  };

  // Open modal for viewing
  const handleOpenViewModal = (account) => {
    setSelectedAccount(account);
    setIsViewModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAccount(null);
  };

  // Close the view modal
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedAccount(null);
  };

  // Handle form submission for adding or updating
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isAdding) {
        // Add new account
        const newAccount = await addBankAccount(form);
        setBankAccounts([...bankAccounts, newAccount]);
      } else {
        // Update existing account
        const updatedAccount = await updateBankAccount(selectedAccount._id, form);
        setBankAccounts(
          bankAccounts.map((account) =>
            account._id === selectedAccount._id ? updatedAccount : account
          )
        );
      }
      handleCloseModal();
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  // Handle deleting an account
  const handleDeleteAccount = async () => {
    try {
      await deleteBankAccount(selectedAccount._id);
      setBankAccounts(bankAccounts.filter((account) => account._id !== selectedAccount._id));
      handleCloseModal();
    } catch (err) {
      console.error('Error deleting account:', err);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/'); // Redirect to login page
  };

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* AppBar for Logout */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#333' }}>
            User Dashboard
          </Typography>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ paddingTop: '20px' }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#333', textAlign: 'center' }}>
          Manage Bank Accounts
        </Typography>

        {/* If no accounts exist, show add button */}
        {bankAccounts.length === 0 && (
          <Box textAlign="center" mt={4}>
            <IconButton onClick={() => handleOpenModal()}>
              <AddCircleOutlineIcon style={{ fontSize: '3rem', color: 'gray' }} />
            </IconButton>
            <Typography>Add your first bank account</Typography>
          </Box>
        )}

        {/* Display bank accounts as cards */}
        <Box
          mt={4}
          display="grid"
          gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={3}
        >
          {bankAccounts.map((account) => (
            <Card key={account._id} sx={{ boxShadow: 4, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#2e7d32' }}>
                  {account.bankName}
                </Typography>
                <Typography>Branch: {account.branchName}</Typography>
                <Typography>IFSC: {account.ifscCode}</Typography>
                <Typography>Account Number: {account.accountNumber}</Typography>
                <Typography>Holder: {account.accountHolderName}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" onClick={() => handleOpenViewModal(account)}>
                  View
                </Button>
                <Button size="small" color="primary" onClick={() => handleOpenModal(account)}>
                  Edit
                </Button>
                <Button size="small" color="error" onClick={() => handleOpenModal(account)}>
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>

        {/* Add Account button */}
        {bankAccounts.length > 0 && (
          <Box textAlign="center" mt={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOpenModal()}
              startIcon={<AddCircleOutlineIcon />}
            >
              Add Bank Account
            </Button>
          </Box>
        )}
      </Container>

      {/* Modal for Add/Edit/Delete */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {isAdding ? 'Add Bank Account' : 'Edit Bank Account'}
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              fullWidth
              label="Bank Name"
              value={form.bankName}
              onChange={(e) => setForm({ ...form, bankName: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Branch Name"
              value={form.branchName}
              onChange={(e) => setForm({ ...form, branchName: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="IFSC Code"
              value={form.ifscCode}
              onChange={(e) => setForm({ ...form, ifscCode: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Account Number"
              value={form.accountNumber}
              onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Account Holder Name"
              value={form.accountHolderName}
              onChange={(e) => setForm({ ...form, accountHolderName: e.target.value })}
              margin="normal"
              required
            />
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" color="primary" type="submit">
                {isAdding ? 'Add' : 'Update'}
              </Button>
              {!isAdding && (
                <Button variant="contained" color="error" onClick={handleDeleteAccount}>
                  Delete
                </Button>
              )}
              <Button variant="outlined" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Modal for View Account */}
      <Modal open={isViewModalOpen} onClose={handleCloseViewModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            View Bank Account
          </Typography>
          <Typography>Bank Name: {selectedAccount?.bankName}</Typography>
          <Typography>Branch: {selectedAccount?.branchName}</Typography>
          <Typography>IFSC: {selectedAccount?.ifscCode}</Typography>
          <Typography>Account Number: {selectedAccount?.accountNumber}</Typography>
          <Typography>Account Holder Name: {selectedAccount?.accountHolderName}</Typography>
          <Box mt={3}>
            <Button variant="outlined" onClick={handleCloseViewModal}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default DashboardPage;
