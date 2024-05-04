import axios, { AxiosRequestConfig } from 'axios';

import { PredictionInstance } from '@types';

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
    } else {
      return response.status;
    }
  } catch (error) {
    throw error;
  }
}
