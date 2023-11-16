import { useCurrentBrewContext } from '@/context/CurrentBrewContext';
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
  users: any;
  openBrew: boolean;
  setOpenBrew: React.Dispatch<React.SetStateAction<boolean>>;
  setMachineStatus: React.Dispatch<React.SetStateAction<string>>;
  setUserSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const BrewTable = ({
  users,
  openBrew,
  setOpenBrew,
  setUserSelected,
}: BrewTableProps) => {
  const router = useRouter();
  const { currentBrew, setCurrentBrew } = useCurrentBrewContext();

  // function to handle the click of the select button on the table
  const handleClick = async (user: User) => {
    setOpenBrew(false);

    if (currentBrew) {
      // if there is already a user selected, deselect by setting their status back to picked
      await fetch(`api/users/${currentBrew.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: currentBrew.name,
          email: currentBrew.email,
          status: 'picked',
        }),
      });
    }

    setUserSelected(true);
    setCurrentBrew(user);

    // set user status to selected
    await fetch(`api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        status: 'selected',
      }),
    });

    router.refresh();
  };

  return (
    <Modal open={openBrew} onClose={() => setOpenBrew(false)}>
      <div>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setOpenBrew(false)}
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
          Who wants coffee?
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
                  <TableCell align="center">
                    Select for brew session
                  </TableCell>
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
                            onClick={() => handleClick(user)}
                            sx={{
                              width: '80%',
                              background: '#3d3934',
                              color: 'white',
                            }}
                          >
                            Select
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

export default BrewTable;
