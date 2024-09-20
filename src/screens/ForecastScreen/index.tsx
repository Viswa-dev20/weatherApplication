import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "./styles";

const ForecastScreen = () => {
  const { forecast, loading, error } = useSelector(
    (state: RootState) => state.weather
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
        keyExtractor={(item) => item.dt.toString()}
        ListHeaderComponent={() => {
          return (
            <Text style={styles.header}>
              5-Day Forecast : {forecast.city.name}
            </Text>
          );
        }}
        renderItem={({ item }) => (
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

export default ForecastScreen;
