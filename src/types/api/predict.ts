import { AxiosInstance } from 'axios';

interface PredictionInstanceMethods {
  postPrediction(formData: FormData | object, accessToken: string): Promise<any>;
}

interface PredictionInstance extends AxiosInstance, PredictionInstanceMethods { };

type PredictResult = {
  class: string;
  translated: string;
  average: number;
  sum: number;
  count: number;
}

export type { PredictionInstance, PredictResult};