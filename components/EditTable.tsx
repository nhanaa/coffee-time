'use client';

import { User } from '@/types/types';
import React from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';

type EditTableProps = {
  users: User[];
};

const EditTable = ({ users }: EditTableProps) => {
  const router = useRouter();
  const [selectedUser, setSelectedUser] = React.useState<User | null>(
    null
  );
  const [newName, setNewName] = React.useState<string>('');
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleClickEdit = async (user: User) => {
    setSelectedUser(user);
    setOpenDialog(true);
    router.refresh();
  };

  const handleClickRemove = async (user: User) => {
    await fetch(`api/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    });

    router.refresh();
  };

  const handleSubmit = async () => {
    setOpenDialog(false);

    if (!selectedUser) return;
    await fetch(`api/users/${selectedUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: newName,
        email: selectedUser.email,
        status: selectedUser.status,
      }),
    });

    setSelectedUser(null);
    setNewName('');

    router.refresh();
  };

  return (
    <div>
      <Typography
        variant="h3"
        sx={{ display: 'block', textAlign: 'center', margin: 2 }}
      >
        Edit users information
      </Typography>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TableContainer component={Paper} sx={{ width: '80%' }}>
          <Table
            sx={{ minWidth: 200 }}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Edit user</TableCell>
                <TableCell align="center">Remove user</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(
                (user: User) =>
                  user.status === 'picked' && (
                    <TableRow
                      key={user.id}
                      sx={{
                        '&:last-child td, &:last-child th': {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell align="center">
                        {user.email}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => handleClickEdit(user)}
                          sx={{
                            width: '80%',
                            background: '#3d3934',
                            color: 'white',
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => handleClickRemove(user)}
                          sx={{
                            width: '80%',
                            background: '#3d3934',
                            color: 'white',
                          }}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit user information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter new user info information below:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={(e) => setNewName(e.target.value)}
            fullWidth
            required
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTable;
