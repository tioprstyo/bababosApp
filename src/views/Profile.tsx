import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {NavigationProps, ProfileProps} from '../type';
import {useStateProfile} from '../storage';
import AsyncStorage from '@react-native-community/async-storage';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    height: windowHeight,
    alignItems: 'center',
  },
  ProductImage: {
    height: 150,
    objectFit: 'contain',
  },
  Title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 20,
  },
  productDesc: {
    marginTop: 15,
  },
  productInfoWrapper: {
    width: '100%',
    marginTop: 15,
  },
  productInfo: {
    width: '90%',
    flexDirection: 'row',
    marginTop: 20,
  },
  productInfoText: {
    fontWeight: '700',
  },
  icon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
    marginRight: 10,
  },
  buttonAddToCart: {
    backgroundColor: '#00d1b2',
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 25,
  },
  buttonAddToCartText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const Profile = ({navigation}: NavigationProps) => {
  const [profile, setProfile] = useState<ProfileProps>();

  const getProfile = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const userProfile: ProfileProps = await useStateProfile();
    setProfile(userProfile);
  };

  const onLoggedOut = () => {
    AsyncStorage.removeItem('profile');
    AsyncStorage.removeItem('cart');
    Toast.show({
      type: 'success',
      text1: 'You have successfully signed out',
    });
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <ScrollView>
      {profile && (
        <View style={styles.Wrapper}>
          <Image
            source={require('../assets/img/company-logo.jpeg')}
            style={styles.ProductImage}
          />
          <View style={styles.productDesc}>
            <View style={styles.productInfoWrapper}>
              <View style={styles.productInfo}>
                <Image
                  source={require('../assets/img/user.png')}
                  style={styles.icon}
                />

                <Text style={styles.productInfoText}>{profile?.username}</Text>
              </View>
              <View style={styles.productInfo}>
                <Image
                  source={require('../assets/img/pin.png')}
                  style={styles.icon}
                />

                <Text style={styles.productInfoText}>{profile?.address}</Text>
              </View>
              <View style={styles.productInfo}>
                <Image
                  source={require('../assets/img/phone.jpeg')}
                  style={styles.icon}
                />

                <Text style={styles.productInfoText}>{profile?.phone}</Text>
              </View>
              <View style={styles.productInfo}>
                <Image
                  source={require('../assets/img/info.png')}
                  style={styles.icon}
                />

                <Text style={styles.productInfoText}>{profile?.about}</Text>
              </View>
            </View>
            <View style={styles.productDesc}>
              <TouchableOpacity
                style={styles.buttonAddToCart}
                onPress={() => onLoggedOut()}>
                <Text style={styles.buttonAddToCartText}>Sign Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <Toast position="top" topOffset={20} />
    </ScrollView>
  );
};

export default Profile;
