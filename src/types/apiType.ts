import { AxiosInstance } from 'axios';

interface PredictionInstanceMethods {
  postPrediction(formData: FormData | object, accessToken: string): Promise<any>;
}

interface PredictionInstance extends AxiosInstance, PredictionInstanceMethods { };

interface AuthInstanceMethods {

}

interface AuthInstance extends AxiosInstance, AuthInstanceMethods { };

export type { PredictionInstance, AuthInstance };
