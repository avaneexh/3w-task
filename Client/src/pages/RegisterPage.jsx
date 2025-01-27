import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/api';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const formData = { username, email, password };

    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response);
      setSuccess(true);
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Registration error:', err.message);
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: 'auto',
        marginTop: '2rem',
        padding: '2rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {success && (
        <Alert severity="success">
          Registration successful! <Link to="/">Login here</Link>
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: '1rem' }}
        >
          Register
        </Button>
      </form>

      <Box mt={2} textAlign="center">
        <Typography variant="body2">
          Already have an account? <Link to="/">Login</Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default RegisterPage;
