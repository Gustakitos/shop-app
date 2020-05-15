import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import ProductsOverViewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const ProductsNavigator = createStackNavigator(
	{
		ProductsOverViewScreen: ProductsOverViewScreen,
		ProductDetail: ProductDetailScreen,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
			},
			headerTitle: { fontFamily: 'open-sans-bold' },
			headerBackTitleStyle: { fontFamily: 'open-sans' },
			headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
		},
	}
);

export default createAppContainer(ProductsNavigator);
