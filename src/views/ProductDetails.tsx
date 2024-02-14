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
import {ProductDetailPageProps, ProductProps} from '../type';
import {useSetCart, useStateCart} from '../storage';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    height: windowHeight,
  },
  ProductImage: {
    height: 100,
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
    width: '50%',
    flexDirection: 'row',
    marginTop: 10,
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

const ProductDetails = ({route}: ProductDetailPageProps) => {
  const userCart = useStateCart();
  const setUserCart = useSetCart();
  const [product, setProduct] = useState<ProductProps>();

  const getProductsDetails = () => {
    fetch(`https://fakestoreapi.com/products/${route?.params.id}`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        setProduct(data);
      });
  };

  const addToCart = async () => {
    let savedCart: ProductProps[] = [];
    savedCart = await userCart;
    savedCart.push(product as ProductProps);
    setUserCart(savedCart);
    Toast.show({
      type: 'success',
      text1: 'You have successfully added to cart',
    });
  };

  useEffect(() => {
    getProductsDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView>
      {product && (
        <View style={styles.Wrapper}>
          <Image source={{uri: product?.image}} style={styles.ProductImage} />
          <View style={styles.productDesc}>
            <Text style={styles.Title} numberOfLines={1}>
              {product?.title}
            </Text>
            <Text style={styles.productDesc}>{product?.description}</Text>
            <View style={styles.productInfoWrapper}>
              <View style={styles.productInfo}>
                <Image
                  source={require('../assets/img/category.png')}
                  style={styles.icon}
                />

                <Text style={styles.productInfoText}>{product?.category}</Text>
              </View>
              <View style={styles.productInfo}>
                <Image
                  source={require('../assets/img/star.png')}
                  style={styles.icon}
                />

                <Text style={styles.productInfoText}>
                  {product?.rating.rate}
                </Text>
              </View>
              <View style={styles.productInfo}>
                <Image
                  source={require('../assets/img/money.jpeg')}
                  style={styles.icon}
                />

                <Text style={styles.productInfoText}>${product?.price}</Text>
              </View>
            </View>
          </View>
          <View style={styles.productDesc}>
            <TouchableOpacity
              style={styles.buttonAddToCart}
              onPress={() => addToCart()}>
              <Text style={styles.buttonAddToCartText}>Add to cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Toast position="top" topOffset={20} />
    </ScrollView>
  );
};

export default ProductDetails;
