import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { loginUser } from '../services/api';
const UserLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      navigate('/dashboard'); // Navigate to the dashboard on successful login
    } catch (err) {
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
            User Login
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
              <strong>Test User:</strong> user@example.com
            </Typography>
            <Typography variant="body2" sx={{ color: '#333' }}>
              <strong>Password:</strong> user1234
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
        <Typography variant="body2">
        Don't have an account? <Link to="/register">Register</Link>
        </Typography>
      </Box>

      {/* Admin Login Button */}
      <Box mt={2} textAlign="center">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/admin/login')}
                sx={{ width: '100%' }}
              >
                Login as Admin
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserLoginPage;
