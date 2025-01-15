import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password should be at least 6 characters long')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
    
      if (values.email === 'admin@admins.ad' && values.password === 'Admin11112222') {
        localStorage.setItem('isAdmin', true);
        navigate('/adminPanel');
      } else {
        
        const storedUsers = JSON.parse(localStorage.getItem('userList')) || [];
        const user = storedUsers.find(
          (u) => u.email === values.email && u.password === values.password
        );

        if (user) {
          localStorage.setItem('isAdmin', false);
          localStorage.setItem('currentUser', JSON.stringify(user)); 
          navigate('/'); 
        } else {
          setErrorMessage('Invalid email or password');
        }
      }
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        color: "#fff",
        p: 3,
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          maxWidth: 400,
          margin: '50px auto',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom color="black">
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
          >
            Login
          </Button>
        </form>
        {errorMessage && (
          <Typography variant="body2" color="red" sx={{ mt: 2 }}>
            {errorMessage}
          </Typography>
        )}
        <Button
          variant="text"
          color="secondary"
          onClick={() => navigate('/signUp')}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Login;