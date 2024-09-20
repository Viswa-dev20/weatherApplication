import React from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

const ForecastScreen = () => {
  const {forecast, loading, error} = useSelector(
    (state: RootState) => state.weather,
  );

  if (loading) {
    return <Text style={styles.weatherText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.weatherText}>Error: {error}</Text>;
  }

  if (!forecast) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.weatherText}>No forecast data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={forecast.list}
        keyExtractor={item => item.dt.toString()}
        ListHeaderComponent={() => {
          return (
            <Text style={styles.header}>
              5-Day Forecast : {forecast.city.name}
            </Text>
          );
        }}
        renderItem={({item}) => (
          <View style={styles.forecastItem}>
            <Text style={styles.weatherText}>
              {new Date(item.dt_txt).toLocaleDateString()}
            </Text>
            <Text style={styles.weatherText}>High: {item.main.temp_max}°C</Text>
            <Text style={styles.weatherText}>Low: {item.main.temp_min}°C</Text>
            <Text style={styles.weatherText}>
              Condition: {item.weather[0].description}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#3b2a6c',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 4,
    color: 'white',
  },
  forecastItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  weatherText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'semibold',
    marginTop: 4,
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#3b2a6c',
  },
});

export default ForecastScreen;
