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
import React from 'react';

export type BrewTableProps = {
  users: any;
  openPing: boolean;
  setOpenPing: React.Dispatch<React.SetStateAction<boolean>>;
};

const PingTable = ({
  users,
  openPing,
  setOpenPing,
}: BrewTableProps) => {
  const handleClick = async (user: User) => {
    console.log('Ping your teammate: ', user.name);

    await fetch(`api/ping`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        subject: 'Your coffee is ready!',
        message: `Hey ${user.name}, your coffee is ready!`,
      }),
    });
  };

  return (
    <Modal open={openPing} onClose={() => setOpenPing(false)}>
      <div>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setOpenPing(false)}
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
          Ping your teammate!
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
                  <TableCell align="center">Ping</TableCell>
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
                            Ping
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

export default PingTable;
