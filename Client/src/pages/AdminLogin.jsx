import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Hardcoded admin credentials
    const adminEmail = 'admin@example.com';
    const adminPassword = 'password_2025';

    if (email === adminEmail && password === adminPassword) {
      // Simulate a JWT token for the admin
      const Token = 'p99dMpQdw3Wna+t16pYG1NZvJteKhqpxDBkLm6XVo04oJiOH/eJHAzla6gLPqynCHq/MOhfJIiX2WYJDe1bpsA==';
      localStorage.setItem('token', Token);
      localStorage.setItem('isAdmin', 'true'); // Ensure this is set

      navigate('/admin/dashboard');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: '20px',
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#1976d2', fontWeight: 700 }}>
            Admin Login
          </Typography>
          <Box
            sx={{
              backgroundColor: '#e3f2fd',
              padding: '10px',
              borderRadius: 2,
              marginBottom: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" sx={{ color: '#333' }}>
              <strong>Admin ID:</strong> admin@example.com
            </Typography>
            <Typography variant="body2" sx={{ color: '#333' }}>
              <strong>Password:</strong> password_2025
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
              variant="outlined"
            />
            {error && (
              <Typography color="error" align="center" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
              Login
            </Button>

            <Box mt={2} textAlign="center">
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate('/')}
                            sx={{ width: '100%' }}
                          >
                            Login as User
                          </Button>
                        </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminLoginPage;
