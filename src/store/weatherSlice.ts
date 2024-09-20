// src/store/weatherSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'b7b3ed33ce38f96fd231796de0446285';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherState {
    currentWeather: any;
    forecast: any;
    loading: boolean;
    error: string | null;
}

const initialState: WeatherState = {
    currentWeather: null,
    forecast: null,
    loading: false,
    error: null,
};

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async (city: string) => {
        const response = await axios.get(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        console.log('Fetch weather 123', response.data);
        return response.data;
    }
);

export const fetchForecast = createAsyncThunk(
    'weather/fetchForecast',
    async (city: string) => {
        try {
            const response = await axios.get(
                `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
            );
            console.log('forecast', response.data);
            return response.data;
        } catch (error) {
            console.log("🚀 ~ error:", error)
        }

    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        resetWeather(state) {
            state.currentWeather = null;
            state.forecast = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = false;
                state.currentWeather = action.payload;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch weather data';
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.forecast = action.payload;
            });
    },
});

export const { resetWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
