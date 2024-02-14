import AsyncStorage from '@react-native-community/async-storage';
import {ProfileProps} from '../type';

export const useProfile = () => {
  const userProfile = AsyncStorage.getItem('profile').then(resp => {
    return JSON.parse(resp || '{}');
  });

  const setUserProfile = (valueSet: ProfileProps) => {
    AsyncStorage.setItem('profile', JSON.stringify(valueSet));
  };

  return [userProfile, setUserProfile];
};

export const useStateProfile = () => {
  const userProfile = AsyncStorage.getItem('profile').then(resp => {
    return JSON.parse(resp || '{}');
  });
  return userProfile;
};

export const useSetProfile = () => {
  const setUserProfile = (valueSet: ProfileProps) => {
    AsyncStorage.setItem('profile', JSON.stringify(valueSet));
  };

  return setUserProfile;
};
