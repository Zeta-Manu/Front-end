import axios, { AxiosRequestConfig } from 'axios';

import { PredictResult, PredictionInstance } from '@customTypes/api/predict';

const predictionInstance = axios.create({
  baseURL: import.meta.env.VITE_PREDICT_ENDPOINT,
}) as PredictionInstance;

predictionInstance.postPrediction = (formData: FormData | object, accessToken: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    timeout: 200000,
  };

    return new Promise<{ result: PredictResult[] }>((resolve, reject) => {
      predictionInstance.post('/api/predict', formData, config)
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else if (response.status === 401) {
            console.error('Unauthorized Error:', response.statusText);
            reject('Unauthorized Error'); 
          } else if (response.status === 500) {
            console.error('Internal Server Error:', response.statusText);
            reject('Internal Server Error');
          } else {
            console.error('Unexpected status code:', response.status);
            reject('Unexpected status code');
          }
        })
        .catch(error => {
          console.error('Error:', error);
          reject(error);
        });
    });
}

export default predictionInstance;