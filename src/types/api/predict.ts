import { AxiosInstance } from 'axios';

interface PredictionInstanceMethods {
  postPrediction(formData: FormData | object, accessToken: string): Promise<any>;
}

interface PredictionInstance extends AxiosInstance, PredictionInstanceMethods { };

export type { PredictionInstance };