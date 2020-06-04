import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import ReduxThunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';

import productsReducer from './store/reducers/productsReducer';
import cartReducer from './store/reducers/cartReducer';
import ShopNavigator from './navigation/ShopNavigator';
import orderReducer from './store/reducers/orderReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer
});

const store = createStore(rootReducer, composeWithDevTools(), applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
