import { AxiosInstance } from 'axios';

interface SignUpBody {
  email: string,
  name: string,
  password: string
}

interface ConfirmSignUpBody {
  confirmationCode: string,
  email: string
}

interface EmailBody {
  email: string
}

interface LoginBody {
  email: string,
  password: string
}

interface ChangePasswordBody {
  previousPassword: string,
  proposedPassword: string
}

interface ConfirmForgotBody {
  confirmationCode: string,
  email: string,
  newPassword: string
}

interface AuthInstanceMethods {
  postSignUp(body: SignUpBody): Promise<any>;
  postConfirmSignUp(body: ConfirmSignUpBody): Promise<any>;
  postResendConfirm(body: EmailBody): Promise<any>;
  postLogin(body: LoginBody): Promise<any>;
  postChangePassword(body: ChangePasswordBody, accessToken: string): Promise<any>;
  postForgetPassword(body: EmailBody): Promise<any>;
  postConfirmForget(body: ConfirmForgotBody): Promise<any>;
}

interface AuthInstance extends AxiosInstance, AuthInstanceMethods { };

export type { AuthInstance, SignUpBody, ConfirmSignUpBody, EmailBody, LoginBody, ChangePasswordBody, ConfirmForgotBody };