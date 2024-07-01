import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Replace with your actual BASE_URL

const useApi = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access') || null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh') || null);

  useEffect(() => {
    localStorage.setItem('access', accessToken);
  }, [accessToken]);

  useEffect(() => {
    localStorage.setItem('refresh', refreshToken);
  }, [refreshToken]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/token/refresh/`, {
        refresh: refreshToken,
      });
      setAccessToken(response.data.access);
    } catch (error) {
      console.error('Failed to refresh access token', error);
    }
  }, [refreshToken]);

  const apiRequest = useCallback(
    async (method, url, data = null, config = {}) => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        ...config.headers,
      };

      try {
        const response = await axios({
          method,
          url: `${BASE_URL}${url}`,
          data,
          headers,
          ...config,
        });
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Token might be expired, try to refresh it
          await refreshAccessToken();
          // Retry the original request with new access token
          headers.Authorization = `Bearer ${accessToken}`;
          const retryResponse = await axios({
            method,
            url: `${BASE_URL}${url}`,
            data,
            headers,
            ...config,
          });
          return retryResponse.data;
        }
        throw error;
      }
    },
    [accessToken, refreshAccessToken]
  );

  return {
    setAccessToken,
    setRefreshToken,
    apiRequest,
  };
};

export default useApi;
