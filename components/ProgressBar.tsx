import React from 'react';
import { Box, Typography, keyframes, useTheme } from '@mui/material';
import { useCurrentBrewContext } from '@/context/CurrentBrewContext';
import { useRouter } from 'next/navigation';
import CoffeeIcon from '@mui/icons-material/Coffee';

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
  const theme = useTheme();
  const [progress, setProgress] = React.useState<number>(0);
  const { currentBrew, setCurrentBrew } = useCurrentBrewContext();
  const [steamOpacity, setSteamOpacity] = React.useState<number>(0);

  // Steam animation keyframes
  const steamAnimation = keyframes`
    0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.7; }
    50% { transform: translateY(-10px) translateX(-5px) scale(1.2); opacity: 0.5; }
    100% { transform: translateY(-20px) translateX(5px) scale(1.5); opacity: 0; }
  `;

  // Pulse animation for the coffee icon
  const pulseAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
  `;

  React.useEffect(() => {
    const startTime = Date.now();

    const updateProgress = async () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const percentage = (elapsedTime / (brewTime * 1000)) * 100;

      setProgress(percentage);
      
      // Increase steam opacity as brewing progresses
      setSteamOpacity(Math.min(percentage / 30, 1));

      if (percentage < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        if (!currentBrew) return; // if there is no current brew, return. This should never happen
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

  // Calculate time remaining
  const timeRemaining = Math.max(0, Math.ceil((brewTime * (100 - progress)) / 100));

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      padding: 3
    }}>
      {/* Coffee cup icon with steam */}
      <Box sx={{ position: 'relative', mb: 2 }}>
        <CoffeeIcon 
          sx={{ 
            fontSize: 40, 
            color: theme.palette.mode === 'dark' ? '#8B5A2B' : '#6F4E37',
            animation: `${pulseAnimation} 2s infinite ease-in-out`
          }} 
        />
        
        {/* Steam elements */}
        {[1, 2, 3].map((i) => (
          <Box 
            key={i}
            sx={{
              position: 'absolute',
              top: -5,
              left: i * 10,
              width: 8,
              height: 15,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '50%',
              opacity: steamOpacity,
              animation: `${steamAnimation} ${1.5 + i * 0.3}s infinite ease-out`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </Box>

      {/* Custom progress bar */}
      <Box 
        sx={{ 
          width: '70%', 
          height: 20, 
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: 10,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.2)'
        }}
      >
        <Box 
          sx={{ 
            height: '100%', 
            width: `${progress}%`, 
            background: `linear-gradient(90deg, #6F4E37 0%, #8B5A2B 100%)`,
            borderRadius: 10,
            transition: 'width 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)',
              borderRadius: 10,
            }
          }} 
        />
        
        {/* Bubbles effect inside progress bar */}
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: Math.random() * 15,
              left: `${(i * 12) + Math.random() * 5}%`,
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              backgroundColor: 'rgba(255,255,255,0.4)',
              borderRadius: '50%',
              opacity: progress > (i * 12) ? 1 : 0,
              transition: 'opacity 0.5s ease'
            }}
          />
        ))}
      </Box>
      
      {/* Progress percentage and time remaining */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '70%', mt: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {Math.min(100, Math.round(progress))}%
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          {timeRemaining}s remaining
        </Typography>
      </Box>
      
      {/* Status message */}
      <Typography 
        variant="subtitle1" 
        sx={{ 
          mt: 2, 
          fontWeight: 'medium',
          color: theme.palette.mode === 'dark' ? '#D2B48C' : '#8B5A2B',
          textShadow: '0px 1px 2px rgba(0,0,0,0.1)'
        }}
      >
        {progress < 100 
          ? `Brewing your perfect cup${'.'.repeat(Math.floor((progress % 100) / 25) + 1)}` 
          : 'Your coffee is ready!'}
      </Typography>
    </Box>
  );
};

export default ProgressBar;
