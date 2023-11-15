'use client';

import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';
import BrewTable from './BrewTable';
import ProgressBar from './ProgressBar';
import Image from 'next/image';
import PingTable from './PingTable';
import { CurrentBrewContextProvider } from '@/context/CurrentBrewContext';
import PickUpTable from './PickUpTable';
import StatusBadge from './StatusBadge';
import { User } from '@/types/types';

export type CoffeeProps = {
  users: User[];
};

const Coffee = ({ users }: CoffeeProps) => {
  const [machineStatus, setMachineStatus] = React.useState<string>(
    'idle'
  ); // ["idle", "brewing"]
  const [userSelected, setUserSelected] = React.useState<boolean>(
    false
  );
  const [openBrew, setOpenBrew] = React.useState<boolean>(false);
  const [openPing, setOpenPing] = React.useState<boolean>(false);
  const [openPickUp, setOpenPickUp] = React.useState<boolean>(false);
  const [brewTime, setBrewTime] = React.useState<number>(0);

  return (
    <CurrentBrewContextProvider>
      <Box>
        <StatusBadge
          machineStatus={machineStatus}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
        />
        <Typography
          variant="h3"
          sx={{ textAlign: 'center', margin: 1 }}
        >
          It&lsquo;s coffee time!
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid
            item
            xs={12}
            sm={4}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              disabled={machineStatus === 'brewing'}
              onClick={() => setOpenBrew(true)}
              sx={{
                width: '80%',
                background: '#3d3934',
                color: 'white',
              }}
            >
              Brew
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              disabled={machineStatus === 'brewing'}
              onClick={() => setOpenPing(true)}
              sx={{
                width: '80%',
                background: '#3d3934',
                color: 'white',
              }}
            >
              Ping
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Button
              variant="contained"
              disabled={machineStatus === 'brewing'}
              onClick={() => setOpenPickUp(true)}
              sx={{
                width: '80%',
                background: '#3d3934',
                color: 'white',
              }}
            >
              Pick Up
            </Button>
          </Grid>
        </Grid>
        {machineStatus === 'idle' && userSelected && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => {
                setMachineStatus('brewing');
                setBrewTime(
                  Math.floor(Math.random() * (60 - 50 + 1)) + 50
                );
              }}
              sx={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: '#3d3934',
                color: 'white',
                margin: 2,
              }}
            >
              Start brew
            </Button>
          </Box>
        )}
        <BrewTable
          users={users}
          openBrew={openBrew}
          setOpenBrew={setOpenBrew}
          setMachineStatus={setMachineStatus}
          setUserSelected={setUserSelected}
        />
        <PingTable
          users={users}
          openPing={openPing}
          setOpenPing={setOpenPing}
        />
        <PickUpTable
          users={users}
          openPickUp={openPickUp}
          setOpenPickUp={setOpenPickUp}
        />
        {machineStatus === 'brewing' && (
          <div>
            <Typography
              variant="h4"
              sx={{ textAlign: 'center', margin: 2 }}
            >
              Brewing your favorite coffee!
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                margin: 4,
              }}
            >
              <Box
                sx={{
                  width: '400px',
                  height: '300px',
                  position: 'relative',
                }}
              >
                <Image
                  src="https://media2.giphy.com/media/Dcqmvo1kzZR0A/giphy.gif"
                  alt="Brewing Coffee gif"
                  layout="fill"
                  sizes="100%"
                />
              </Box>
            </Box>
          </div>
        )}
        {machineStatus === 'brewing' && (
          <ProgressBar
            brewTime={brewTime}
            setMachineStatus={setMachineStatus}
            setUserSelected={setUserSelected}
          />
        )}
      </Box>
    </CurrentBrewContextProvider>
  );
};

export default Coffee;
