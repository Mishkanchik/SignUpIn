
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';

const Registration = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    nickname: Yup.string().required('Nickname is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password should be at least 6 characters long')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        nickname: values.nickname,
        email: values.email,
        password: values.password,
      };

 
      const existingUsers = JSON.parse(localStorage.getItem('userList')) || [];

   
      existingUsers.push(userData);

     
      localStorage.setItem('userList', JSON.stringify(existingUsers));

      console.log('Sign Up details saved to localStorage:', userData);
      setMessage('Registration successful!');
      setTimeout(() => navigate('/'), 2000);
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
      }}>
        <Box
          sx={{
            backgroundColor:"white",
            maxWidth: 400,
            margin: '50px auto',
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom color='black'>
            Sign Up
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                id="nickname"
                name="nickname"
                label="Nickname"
                variant="outlined"
                value={formik.values.nickname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.nickname && Boolean(formik.errors.nickname)}
                helperText={formik.touched.nickname && formik.errors.nickname}
              />
            </Box>
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
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign Up
            </Button>
          </form>
          {message && (
            <Typography variant="body2" color="green" sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
          <Button
            variant="text"
            color="secondary"
            onClick={() => navigate('/signIn')}
          >
            Sign In
          </Button>
        </Box>
    </Box>
  );
};

export default Registration;
