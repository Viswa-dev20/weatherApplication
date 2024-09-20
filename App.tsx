// App.tsx
import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import CurrentWeatherScreen from './src/screens/CurrentWeatherScreen';
import ForecastScreen from './src/screens/ForecastScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarIcon: () => {
              return (
                <Image
                  source={
                    route.name === 'Current Weather'
                      ? require('./src/assets/images/weather.png')
                      : require('./src/assets/images/weather-forecast.png')
                  }
                  style={styles.tabBarIcon}
                />
              );
            },
            tabBarActiveBackgroundColor: '#ab34eb',
            tabBarActiveTintColor: 'white',
            tabBarInactiveTintColor: 'black',
          })}>
          <Tab.Screen name="Current Weather" component={CurrentWeatherScreen} />
          <Tab.Screen name="Forecast" component={ForecastScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  tabBarIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default App;
