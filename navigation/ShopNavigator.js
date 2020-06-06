import React from 'react';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
  DrawerItems
} from 'react-navigation';
import {
  Button,
  Platform,
  SafeAreaView,
  View
} from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import * as authActions from "../store/actions/authActions";
import { useDispatch } from "react-redux";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
    {
      ProductsOverview: ProductsOverviewScreen,
      ProductDetail: ProductDetailScreen,
      Cart: CartScreen,
    },
    {
      navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={ Platform.OS === 'android' ? 'md-cart' : 'ios-cart' }
                size={ 23 }
                color={ drawerConfig.tintColor }
            />
        ),
      },
      defaultNavigationOptions: defaultNavOptions,
    },
);

const OrdersNavigator = createStackNavigator({
      Order: OrdersScreen,
    }, {
      navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={ Platform.OS === 'android' ? 'md-list' : 'ios-list' }
                size={ 23 }
                color={ drawerConfig.tintColor }
            />
        ),
      },
      defaultNavigationOptions: defaultNavOptions,
    },
);

const AdminNavigator = createStackNavigator({
      UserProducts: UserProductsScreen,
      EditProduct: EditProductScreen
    }, {
      navigationOptions: {
        drawerIcon: drawerConfig => (
            <Ionicons
                name={ Platform.OS === 'android' ? 'md-create' : 'ios-create' }
                size={ 23 }
                color={ drawerConfig.tintColor }
            />
        ),
      },
      defaultNavigationOptions: defaultNavOptions,
    },
);

const ShopNavigator = createDrawerNavigator({
      Products: ProductsNavigator,
      Orders: OrdersNavigator,
      Admin: AdminNavigator,
    },
    {
      contentOptions: {
        activeTintColor: Colors.primary,
      },
      contentComponent: props => {
        const dispatch = useDispatch();
        return (
            <View style={ {
              flex: 1,
              paddingTop: 20
            } }>
              <SafeAreaView forceInset={ {
                top: 'always',
                horizontal: 'never'
              } }>
                <DrawerItems { ...props } />
                <Button title='Logout' color={ Colors.primary }
                        onPress={ () => {
                          dispatch(authActions.logout());
                          // props.navigation.navigate('Auth')
                        }}
                />
              </SafeAreaView>
            </View>
        )
      }
    },
);

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, {
  defaultNavigationOptions: defaultNavOptions
})

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
})


export default createAppContainer(MainNavigator);
