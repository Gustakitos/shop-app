import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  useDispatch,
  useSelector
} from 'react-redux';
import {
  HeaderButtons,
  Item
} from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cartActions';
import * as productActions from '../../store/actions/productsActions';

import Colors from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const [ isLoading, setIsLoading ] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [ error, setError ] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true)
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false)
  }, [ dispatch, setIsLoading, setError ]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false)
    });
  }, [ dispatch, loadProducts ]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => loadProducts);

    return () => {
      unsubscribe();
    };
  }, [ loadProducts ]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  if (isLoading) {
    return (
        <View style={ styles.centered }>
          <ActivityIndicator size='large' color={ Colors.primary }/>
        </View>
    );
  }

  if (error) {
    return (
        <View style={ styles.centered }>
          <Text>An error occured!</Text>
          <Button title='Try again' onPress={ loadProducts }
                  color={ Colors.primary }/>
        </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
        <View style={ styles.centered }>
          <Text>No products found. Maybe add some</Text>
        </View>
    );
  }

  return (
      <FlatList
          onRefresh={ loadProducts }
          refreshing={ isRefreshing }
          data={ products }
          keyExtractor={ item => item.id }
          renderItem={ itemData => (
              <ProductItem
                  image={ itemData.item.imageUrl }
                  title={ itemData.item.title }
                  price={ itemData.item.price }
                  onSelect={ () => {
                    selectItemHandler(itemData.item.id, itemData.item.title);
                  } }
              >
                <Button
                    color={ Colors.primary }
                    title="View Details"
                    onPress={ () => {
                      selectItemHandler(itemData.item.id, itemData.item.title);
                    } }
                />
                <Button
                    color={ Colors.primary }
                    title="To Cart"
                    onPress={ () => {
                      dispatch(cartActions.addToCart(itemData.item));
                    } }
                />
              </ProductItem>
          ) }
      />
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={ HeaderButton }>
          <Item
              title="Menu"
              iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu' }
              onPress={ () => {
                navData.navigation.toggleDrawer();
              } }
          />
        </HeaderButtons>
    ),
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={ HeaderButton }>
          <Item
              title="Cart"
              iconName={ Platform.OS === 'android' ? 'md-cart' : 'ios-cart' }
              onPress={ () => {
                navData.navigation.navigate('Cart');
              } }
          />
        </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default ProductsOverviewScreen;
