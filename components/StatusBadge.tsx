import { useCurrentBrewContext } from '@/context/CurrentBrewContext';
import { Cancel } from '@mui/icons-material';
import { Badge, Box, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

export type StatusBadgeProps = {
  machineStatus: string;
  userSelected: boolean;
  setUserSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const StatusBadge = ({
  machineStatus,
  userSelected,
  setUserSelected,
}: StatusBadgeProps) => {
  const router = useRouter();
  const { currentBrew, setCurrentBrew } = useCurrentBrewContext();

  const statusColorMap: Record<string, string> = {
    idle: 'green',
    brewing: '#d4a91d',
  };

  const statusColor: string = statusColorMap[machineStatus];

  const handleClick = async () => {
    if (currentBrew) {
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
    setCurrentBrew(null);
    setUserSelected(false);
    router.refresh();
  };

  return (
    <Badge sx={{ margin: 1 }}>
      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ textAlign: 'center', color: statusColor, margin: 2 }}
      >
        {machineStatus.toUpperCase()}
      </Typography>
      {currentBrew && userSelected && (
        <Box>
          <Typography
            variant="h5"
            sx={{ textAlign: 'center', margin: 1, display: 'inline' }}
          >
            User selected: {currentBrew.name}
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClick}
            disabled={machineStatus === 'brewing'}
            sx={{
              color: 'black',
              display: 'inline',
              margin: 2,
              marginLeft: 0,
            }}
          >
            <Cancel fontSize="medium" />
          </IconButton>
        </Box>
      )}
    </Badge>
  );
};

export default StatusBadge;
