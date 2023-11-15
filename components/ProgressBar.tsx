import React from 'react';
import LinearProgressWithLabel from '@mui/material/LinearProgress';
import { Box } from '@mui/material';
import { useCurrentBrewContext } from '@/context/CurrentBrewContext';
import { useRouter } from 'next/navigation';

export type ProgressBarProps = {
  brewTime: number;
  setMachineStatus: React.Dispatch<React.SetStateAction<string>>;
  setUserSelected: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProgressBar = ({
  brewTime,
  setMachineStatus,
  setUserSelected,
}: ProgressBarProps) => {
  const router = useRouter();
  const [progress, setProgress] = React.useState<number>(0);
  const { currentBrew, setCurrentBrew } = useCurrentBrewContext();

  React.useEffect(() => {
    const startTime = Date.now();

    const updateProgress = async () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const percentage = (elapsedTime / (brewTime * 1000)) * 100;

      setProgress(percentage);

      if (percentage < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        if (!currentBrew) return;
        await fetch(`api/users/${currentBrew.id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            name: currentBrew.name,
            email: currentBrew.email,
            status: 'brewed',
          }),
        });

        setCurrentBrew(null);
        setUserSelected(false);
        setMachineStatus('idle');
        router.refresh();
      }
    };

    updateProgress();
  }, [
    brewTime,
    currentBrew,
    setMachineStatus,
    setCurrentBrew,
    setUserSelected,
    router,
  ]);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <LinearProgressWithLabel
        variant="determinate"
        value={progress}
        color="inherit"
        sx={{
          width: '60%',
          height: '15px',
          borderRadius: '10px',
          marginTop: 2,
        }}
      />
    </Box>
  );
};

export default ProgressBar;
