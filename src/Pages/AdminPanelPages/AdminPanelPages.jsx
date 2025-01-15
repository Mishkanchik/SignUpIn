import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Fab,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Divider,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('userList')) || [];
    setUsers(storedUsers);
  }, []);

  const saveUsersToStorage = (updatedUsers) => {
    localStorage.setItem('userList', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setOpen(true);
  };

  const handleDeleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email);
    saveUsersToStorage(updatedUsers);
  };

  const formik = useFormik({
    initialValues: editingUser || {
      email: '',
      nickname: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
      nickname: Yup.string().required('Nickname is required'),
    }),
    onSubmit: (values) => {
      const updatedUsers = editingUser
        ? users.map((user) => (user.email === editingUser.email ? values : user))
        : [...users, values];
      saveUsersToStorage(updatedUsers);
      setOpen(false);
    },
  });

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel
      </Typography>

      <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper', mx: 'auto' }}>
        {users.map((user) => (
          <React.Fragment key={user.email}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={user.nickname} src="/static/images/avatar/default.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={user.nickname}
                secondary={
                  <Typography component="span" variant="body2" color="text.primary">
                    {user.email}
                  </Typography>
                }
              />
              <Button color="primary" onClick={() => handleEditUser(user)}>
                Edit
              </Button>
              <Button color="error" onClick={() => handleDeleteUser(user.email)}>
                Delete
              </Button>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>

      <Fab color="secondary" aria-label="add" onClick={handleAddUser} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editingUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
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
              margin="dense"
              disabled={!!editingUser}
            />
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
              margin="dense"
            />
            <DialogActions>
              <Button onClick={() => setOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Save
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;
