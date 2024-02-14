import React, {useEffect, useState} from 'react';
import {BottomSheet} from 'react-native-btr';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {NavigationProps, ProductProps} from '../type';
import {useStateCart} from '../storage';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    height: windowHeight,
  },
  CardItems: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 10,
    elevation: 5,
  },
  ProductImage: {
    width: 100,
    height: 100,
    objectFit: 'contain',
  },
  CardDesc: {
    flex: 1,
    padding: 20,
  },
  CardTitle: {
    fontWeight: 'bold',
    color: '#000000',
  },
  Quantity: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    height: 30,
    width: 60,
  },
  ButtonAdjustQuantity: {
    borderColor: '#000000',
    borderWidth: 1,
    width: 24,
    height: 24,
  },
  TextQuantity: {
    color: '#000000',
    textAlign: 'center',
  },
  QuantityValue: {
    paddingVertical: 0,
    width: 30,
    textAlign: 'center',
  },
  BottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  BottomSheetWraper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  BottomSheetTitle: {
    textAlign: 'center',
    padding: 20,
    fontSize: 20,
    color: '#000000',
  },
  BottomSheetActionWraper: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  BottomSheetCalculation: {
    width: '50%',
    alignItems: 'center',
  },
  BottomSheetTotalText: {
    fontWeight: 'bold',
    color: '#000000',
  },
  BottomSheetPaymentButton: {
    width: '50%',
    backgroundColor: '#00d1b2',
    justifyContent: 'center',
    borderRadius: 10,
  },
  BottomSheetPaymentText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  CheckoutButton: {
    marginTop: 25,
    backgroundColor: '#00d1b2',
    borderRadius: 10,
    padding: 12,
    width: '80%',
    alignSelf: 'center',
  },
});

const Cart = ({navigation}: NavigationProps) => {
  const [carts, setCarts] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const userCart = useStateCart();

  const getCarts = async () => {
    let slepet = await userCart;
    var groupBy = function () {
      let total = 0;
      let cartData = slepet.reduce(function (r: any, a: ProductProps) {
        total += a.price;
        r[a.id] = r[a.id] || [];
        r[a.id].push(a);
        return r;
      }, Object.create(null));

      return {
        cartData,
        total,
      };
    };
    setCarts(groupBy().cartData);
    setTotalPrice(groupBy().total);
  };

  const onChangeQuantity = (isAdd: boolean, id: number) => {
    let newCart = carts;
    if (isAdd) {
      newCart?.[id].push(newCart?.[id][0]);
      setTotalPrice(totalPrice + newCart?.[id][0].price);
      setCarts({
        ...carts,
        [id]: newCart?.[id],
      });
    } else {
      newCart?.[id].pop();
      setTotalPrice(totalPrice - newCart?.[id][0].price);
      setCarts({
        ...carts,
        [id]: newCart?.[id],
      });
    }
  };

  useEffect(() => {
    getCarts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView>
      {carts && (
        <View style={styles.Wrapper}>
          {Object.entries(carts).map((e: any, index: number) => (
            <View style={styles.CardItems} key={index}>
              <Image
                source={{uri: e[1][0].image}}
                style={styles.ProductImage}
              />
              <View style={styles.CardDesc}>
                <Text numberOfLines={1} style={styles.CardTitle}>
                  {e[1][0].title}
                </Text>
                <Text>{e[1][0].category}</Text>
                <Text style={styles.CardTitle}>${e[1][0].price}</Text>
                <Text style={styles.CardTitle}>
                  Total : ${e[1][0].price * e[1].length}
                </Text>
                <View style={styles.Quantity}>
                  <TouchableOpacity
                    style={styles.ButtonAdjustQuantity}
                    onPress={() => onChangeQuantity(false, e[1][0].id)}
                    disabled={e[1].length < 2}>
                    <Text style={styles.TextQuantity}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    placeholderTextColor="#000000"
                    value={e[1].length.toString()}
                    style={styles.QuantityValue}
                  />
                  <TouchableOpacity
                    style={styles.ButtonAdjustQuantity}
                    onPress={() => onChangeQuantity(true, e[1][0].id)}>
                    <Text style={styles.TextQuantity}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
          <TouchableOpacity
            style={styles.CheckoutButton}
            onPress={() => setVisible(true)}>
            <Text style={styles.BottomSheetPaymentText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
      <BottomSheet
        visible={visible}
        //setting the visibility state of the bottom shee
        onBackButtonPress={() => setVisible(!visible)}
        //Toggling the visibility state
        onBackdropPress={() => setVisible(!visible)}
        //Toggling the visibility state
      >
        {/*Bottom Sheet inner View*/}
        <View style={styles.BottomNavigationView}>
          <View style={styles.BottomSheetWraper}>
            <Text style={styles.BottomSheetTitle}>Continue to Payment</Text>
            <View style={styles.BottomSheetActionWraper}>
              <View style={styles.BottomSheetCalculation}>
                <Text style={styles.BottomSheetTotalText}>Total</Text>
                <Text style={styles.BottomSheetTotalText}>${totalPrice}</Text>
              </View>
              <TouchableOpacity
                style={styles.BottomSheetPaymentButton}
                onPress={() => navigation.navigate('Thankyou Page')}>
                <Text style={styles.BottomSheetPaymentText}>Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </BottomSheet>
    </ScrollView>
  );
};

export default Cart;
