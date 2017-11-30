import axios from 'axios';
import { API_AUTH_URI } from '../../constants/api';

export const fetchAuthToken = (userEmail) =>
    axios.post(
        API_AUTH_URI,
        `"${userEmail}"`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .catch(errorMessage => {
            const error = new Error(errorMessage);

            throw error;
        });