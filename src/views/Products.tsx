import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {NavigationProps, ProductProps} from '../type';

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    padding: 10,
  },
  mainFilterCategory: {
    marginVertical: 15,
    marginHorizontal: '3%',
    maxHeight: 33,
  },
  filterCategoryActive: {
    backgroundColor: '#00d1b2',
    paddingHorizontal: 15,
    paddingVertical: 5,
    paddingBottom: 10,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
  },
  filterCategory: {
    backgroundColor: 'white',
    borderColor: '#00d1b2',
    borderWidth: 1,
    paddingVertical: 5,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    alignItems: 'center',
  },
  filterCategoryTextActive: {
    color: 'white',
    fontWeight: '500',
  },
  filterCategoryText: {
    color: '#00d1b2',
    fontWeight: '500',
  },
  ProductImage: {
    width: 100,
    height: 100,
    objectFit: 'contain',
  },
  CardsWrapper: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  Cards: {
    width: '44%',
    marginHorizontal: '3%',
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 0,
    marginVertical: 10,
    borderColor: '#808080',
    elevation: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTextTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});

const Products = ({navigation}: NavigationProps) => {
  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);
  const [filterList, setFilterList] = useState<ProductProps[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filterActive, setFilterActive] = useState<string>('');

  const getProducts = () => {
    fetch('https://fakestoreapi.com/products/')
      .then(res => {
        return res.json();
      })
      .then(data => {
        let category: string[] = ['all'];
        setAllProducts(data);
        setFilterList(data);
        data.forEach((e: ProductProps) => {
          if (!category.find(ctgry => ctgry === e.category)) {
            category.push(e.category);
          }
        });
        setCategories(category);
      });
  };

  const filterProducts = (filterParam: string) => {
    let filterProductList = [...allProducts];
    if (filterParam !== 'all') {
      setFilterList(
        (filterProductList = filterProductList.filter(
          (product: ProductProps) => product.category === filterParam,
        )),
      );
    } else {
      setFilterList(filterProductList);
    }

    setFilterActive(filterParam);
  };

  const onDetailProduct = (id: number) => {
    navigation.navigate('Product Details', {id});
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={styles.Wrapper}>
      <View style={styles.mainFilterCategory}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {categories &&
            categories.map((e: string, idx: number) => (
              <TouchableOpacity
                style={
                  filterActive === e
                    ? styles.filterCategoryActive
                    : styles.filterCategory
                }
                key={idx}
                onPress={() => filterProducts(e)}>
                <Text
                  style={
                    filterActive === e
                      ? styles.filterCategoryTextActive
                      : styles.filterCategoryText
                  }>
                  {e.charAt(0).toLocaleUpperCase() + e.substring(1)}
                </Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      <ScrollView>
        <>
          <View style={styles.CardsWrapper}>
            {filterList &&
              filterList.map((e: ProductProps, index: number) => (
                <TouchableOpacity
                  style={styles.Cards}
                  key={index}
                  onPress={() => onDetailProduct(e.id)}>
                  <Image source={{uri: e.image}} style={styles.ProductImage} />
                  <Text numberOfLines={1} style={styles.cardTextTitle}>
                    {e.title}
                  </Text>
                  <Text numberOfLines={1}>{e.category}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </>
      </ScrollView>
    </View>
  );
};

export default Products;
