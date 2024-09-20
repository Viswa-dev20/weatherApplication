import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchForecast, fetchWeather, resetWeather} from '../store/weatherSlice';
import {RootState} from '../store/store';

const CurrentWeatherScreen = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const {currentWeather, loading, error} = useSelector(
    (state: RootState) => state.weather,
  );

  const handleSearch = () => {
    if (city) {
      dispatch(fetchWeather(city.toLowerCase()));
      dispatch(fetchForecast(city.toLowerCase()));
    } else {
      alert('Please enter a city');
    }
  };

  useEffect(() => {
    if (city.length === 0) {
      dispatch(resetWeather());
    }
  }, [city]);

  return (
    <View style={styles.container}>
      <Image
        style={styles.weatherImage}
        source={require('../assets/images/cloudy.png')}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
        placeholderTextColor={'white'}
      />
      <Button title="Get Weather" color={'#ab34eb'} onPress={handleSearch} />
      {loading && <Text style={styles.weatherText}>Loading...</Text>}
      {error && <Text style={styles.weatherText}>Error: {error}</Text>}
      {currentWeather && (
        <View style={styles.weatherDetailsView}>
          <Text style={styles.weatherText}>
            Temperature: {currentWeather.main.temp}°C
          </Text>
          <Text style={styles.weatherText}>
            Humidity: {currentWeather.main.humidity}%
          </Text>
          <Text style={styles.weatherText}>
            Wind Speed: {currentWeather.wind.speed} m/s
          </Text>
          <Text style={styles.weatherText}>
            Weather: {currentWeather.weather[0].description}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#3b2a6c',
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    borderColor: 'white',
    color: 'white',
  },
  weatherDetailsView: {
    marginTop: 12,
  },
  weatherText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'semibold',
    marginTop: 4,
  },
  weatherImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },
});

export default CurrentWeatherScreen;
