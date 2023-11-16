import { User } from '@/types/types';
import { Cancel } from '@mui/icons-material';
import {
  Button,
  Container,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

export type BrewTableProps = {
  users: User[];
  openPickUp: boolean;
  setOpenPickUp: React.Dispatch<React.SetStateAction<boolean>>;
};

const PickUpTable = ({
  users,
  openPickUp,
  setOpenPickUp,
}: BrewTableProps) => {
  const router = useRouter();

  // function to handle the click of the pick up button on the table
  const handleClick = async (user: User) => {
    console.log('Pick up coffee of: ', user.name);
    await fetch(`api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        status: 'picked',
      }),
    });

    router.refresh();
  };

  return (
    <Modal open={openPickUp} onClose={() => setOpenPickUp(false)}>
      <div>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setOpenPickUp(false)}
          sx={{
            color: 'white',
            position: 'absolute',
            top: 5,
            right: 5,
            margin: 2,
          }}
        >
          <Cancel fontSize="large" />
        </IconButton>
        <Typography
          variant="h3"
          sx={{ display: 'block', textAlign: 'center', margin: 2 }}
        >
          Pick up your coffee!
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
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Pick Up</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map(
                  (user: User) =>
                    user.status === 'brewed' && (
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
                          {user.status}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            variant="contained"
                            onClick={() => handleClick(user)}
                            sx={{
                              background: '#3d3934',
                              color: 'white',
                            }}
                          >
                            Pick Up
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
    </Modal>
  );
};

export default PickUpTable;
