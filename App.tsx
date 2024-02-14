/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/views/Login';
import Products from './src/views/Products';
import ProductDetails from './src/views/ProductDetails';
import Profile from './src/views/Profile';
import {NavigationProps} from './src/type';
import Cart from './src/views/Cart';
import ThankyouPage from './src/views/ThankyouPage';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  imageLogo: {
    height: 30,
    width: 100,
    objectFit: 'contain',
  },
  mainIcon: {
    flexDirection: 'row',
  },
  iconCart: {
    height: 30,
    width: 30,
    marginLeft: 10,
    objectFit: 'contain',
  },
});

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Thankyou Page"
          component={ThankyouPage}
          options={() => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={() => ({
            headerTitle: () => (
              <Image
                style={styles.imageLogo}
                source={require('./src/assets/img/logo.png')}
              />
            ),
          })}
        />
        <Stack.Screen
          name="Products"
          component={Products}
          options={({navigation}: NavigationProps) => ({
            headerTitle: () => (
              <Image
                style={styles.imageLogo}
                source={require('./src/assets/img/logo.png')}
              />
            ),
            headerRight: () => (
              <View style={styles.mainIcon}>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                  <Image
                    style={styles.iconCart}
                    source={require('./src/assets/img/cart.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}>
                  <Image
                    style={styles.iconCart}
                    source={require('./src/assets/img/user.png')}
                  />
                </TouchableOpacity>
              </View>
            ),
            headerBackVisible: false,
          })}
        />
        <Stack.Screen
          name="Product Details"
          component={ProductDetails}
          options={({navigation}: NavigationProps) => ({
            headerTitle: () => (
              <Image
                style={styles.imageLogo}
                source={require('./src/assets/img/logo.png')}
              />
            ),
            headerRight: () => (
              <View style={styles.mainIcon}>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                  <Image
                    style={styles.iconCart}
                    source={require('./src/assets/img/cart.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}>
                  <Image
                    style={styles.iconCart}
                    source={require('./src/assets/img/user.png')}
                  />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTitle: () => (
              <Image
                style={styles.imageLogo}
                source={require('./src/assets/img/logo.png')}
              />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
