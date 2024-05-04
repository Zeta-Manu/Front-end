import axios, { AxiosRequestConfig } from 'axios';

import { PredictionInstance } from '@customTypes/api/predict';

// TODO: PREDICT_ENV
const predictionInstance = axios.create({
  baseURL: "backend_url",
}) as PredictionInstance;

predictionInstance.postPrediction = async (formData: FormData | object, accessToken: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    timeout: 200000,
  };

  try {
    const response = await predictionInstance.post('/api/predict', formData, config);
    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      console.error('Unauthorized Error:', response.statusText);
      return response.status;
    } else if (response.status === 500) {
      console.error('Internal Server Error:', response.statusText);
      return response.status;
    } else {
      console.error('Unexpected status code:', response.status);
      return response.status;
    }
  } catch (error) {
    throw error;
  }
}
