import { User } from '@/types/types';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

/**
 * This context is used to store the user that is selected for the
 * current brew section. It is used to pass the the value of the user
 * to the components used in Coffee component.
 **/
export type CurrentBrewContextProps = {
  currentBrew: User | null;
  setCurrentBrew: React.Dispatch<React.SetStateAction<User | null>>;
};

export type CurrentBrewContextProviderProps = {
  children: ReactNode;
};

const CurrentBrewContext = createContext<CurrentBrewContextProps | null>(
  null
);

export const useCurrentBrewContext = () => {
  const context = useContext(CurrentBrewContext);

  if (!context) {
    throw new Error(
      'useCurrentBrewContext must be used within a CurrentBrewContextProvider'
    );
  }

  return context;
};

export const CurrentBrewContextProvider: React.FC<CurrentBrewContextProviderProps> = ({
  children,
}) => {
  const [currentBrew, setCurrentBrew] = useState<User | null>(null);

  return (
    <CurrentBrewContext.Provider
      value={{ currentBrew, setCurrentBrew }}
    >
      {children}
    </CurrentBrewContext.Provider>
  );
};
