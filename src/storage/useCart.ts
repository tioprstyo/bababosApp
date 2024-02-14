import AsyncStorage from '@react-native-community/async-storage';
import {ProductProps} from '../type';

export const useCart = () => {
  const userCart = AsyncStorage.getItem('cart').then(resp => {
    return JSON.parse(resp || '{}');
  });

  const setUserCart = (valueSet: ProductProps[]) => {
    AsyncStorage.setItem('cart', JSON.stringify(valueSet));
  };

  return [userCart, setUserCart];
};

export const useStateCart = () => {
  const userCart = AsyncStorage.getItem('cart').then(resp => {
    return JSON.parse(resp || '{}');
  });
  return userCart;
};

export const useSetCart = () => {
  const setUserCart = (valueSet: ProductProps[]) => {
    AsyncStorage.setItem('cart', JSON.stringify(valueSet));
  };

  return setUserCart;
};
