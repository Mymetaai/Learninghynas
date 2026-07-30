import type { FC } from 'react';
import LandingEntry from '../components/LandingEntry';
import HomeScreen from './HomeScreen';

const LoginScreen: FC = () => {
  return (
    <LandingEntry>
      <HomeScreen />
    </LandingEntry>
  );
};

export default LoginScreen;
