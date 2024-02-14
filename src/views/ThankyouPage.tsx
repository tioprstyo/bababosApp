import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {NavigationProps} from '../type';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000000',
  },
  LogoPaymentConfirm: {
    width: 250,
    height: 100,
    objectFit: 'contain',
    marginBottom: 25,
  },
  buttonPaymentConfirm: {
    width: 280,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 12,
    marginTop: 25,
    backgroundColor: '#4EA07D',
  },
  textButtonPaymentConfirm: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: '700',
  },
  ContentWraper: {
    alignItems: 'center',
  },
  Title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4EA07D',
    marginBottom: 10,
  },
});

const ThankyouPage = ({navigation}: NavigationProps) => {
  return (
    <View style={styles.Wrapper}>
      <Image
        source={require('../assets/img/success.png')}
        style={styles.LogoPaymentConfirm}
      />
      <View style={styles.ContentWraper}>
        <Text style={styles.Title}>Payment Successfull</Text>
        <Text>The Payment has been done successfully.</Text>
        <Text>Thanks for being there with us.</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonPaymentConfirm}
        onPress={() => navigation.navigate('Products')}>
        <Text style={styles.textButtonPaymentConfirm}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ThankyouPage;
