import axios from 'axios';
import { API_URL } from './constants';

// Hardcoded admin JWT for testing
const ADMIN_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYzc1NzA3ZS00NmM1LTQ0MzItYjkxNi0xNWNjMjQ5NGUxOTYiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MzY2MTMwNzYsImV4cCI6MTczNjY5OTQ3Nn0.3b0VZTwsUAqhIElvcbwnw3xGw2m3qd9ZekT2cMYzK5uxt7_Rq9uF7roIJy9J_aFZ2TdF4Ec1cAIeA';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`  // Hardcoded for now
    },
});

export default api;