import React, { useState, useEffect } from 'react';
import { TextField, Grid, Box, Typography, Card, CardContent, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate to handle navigation
import { getAllUsers, getAllBankAccounts } from '../services/api'; // API calls
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Custom Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#2e7d32',
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
    text: {
      primary: '#333333', // Dark text color
      secondary: '#757575', // Subtle gray
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      color: '#1976d2',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#333333',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          padding: '20px',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: '#1976d2',
          color: '#ffffff',
          fontWeight: 700,
        },
        body: {
          fontSize: 14,
        },
      },
    },
  },
});

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredBankAccounts, setFilteredBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook to navigate between pages

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usersData = await getAllUsers();
        const bankAccountsData = await getAllBankAccounts();
        setUsers(usersData);
        setBankAccounts(bankAccountsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter users and bank accounts based on search query
  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredBankAccounts(
      bankAccounts.filter((account) =>
        account.user?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.user?.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users, bankAccounts]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/admin/login'); // Redirect to login page
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: '100vh',
          padding: '30px',
        }}
      >
        {/* Page Title */}
        <Typography variant="h4" align="center" gutterBottom>
          Admin Dashboard
        </Typography>

        {/* Logout Button */}
        <Box textAlign="right" sx={{ marginBottom: '20px' }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{
              backgroundColor: '#d32f2f',
              '&:hover': {
                backgroundColor: '#b71c1c',
              },
            }}
          >
            Logout
          </Button>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            maxWidth: '600px',
            margin: '0 auto',
            marginBottom: '30px',
          }}
        >
          <TextField
            label="Search Users"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>

        {/* Loading Indicator */}
        {loading ? (
          <Box sx={{ textAlign: 'center', marginTop: '30px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* Users Table */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Users
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Email</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user._id}>
                          <TableCell>{user.username}</TableCell>
                          <TableCell>{user.email}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>

            {/* Bank Accounts Table */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Bank Accounts
                  </Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>User</TableCell>
                        <TableCell>Bank Name</TableCell>
                        <TableCell>Account Number</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredBankAccounts.map((account) => (
                        <TableRow key={account._id}>
                          <TableCell>{account.user.username}</TableCell>
                          <TableCell>{account.bankName}</TableCell>
                          <TableCell>{account.accountNumber}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default AdminDashboard;
