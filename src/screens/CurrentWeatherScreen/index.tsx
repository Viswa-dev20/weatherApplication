import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchForecast,
  fetchWeather,
  resetWeather,
} from "../../store/weatherSlice";
import { RootState } from "../../store/store";
import styles from "./styles";

const CurrentWeatherScreen = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const { currentWeather, loading, error } = useSelector(
    (state: RootState) => state.weather
  );

  const handleSearch = () => {
    if (city) {
      dispatch(fetchWeather(city.toLowerCase()));
      dispatch(fetchForecast(city.toLowerCase()));
    } else {
      alert("Please enter a city");
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
        source={require("../../assets/images/cloudy.png")}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
        placeholderTextColor={"white"}
      />
      <Button title="Get Weather" color={"#ab34eb"} onPress={handleSearch} />
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

export default CurrentWeatherScreen;
