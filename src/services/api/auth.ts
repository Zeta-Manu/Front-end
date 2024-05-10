import axios, { AxiosRequestConfig } from 'axios';

import { AuthInstance, ChangePasswordBody, ConfirmForgotBody, ConfirmSignUpBody, EmailBody, LoginBody, SignUpBody } from '@customTypes/api/auth';

const authInstance = axios.create({
    baseURL: import.meta.env.VITE_AUTH_ENDPOINT,
}) as AuthInstance;

// TODO: Write Error Handling
authInstance.postSignUp = async (body: SignUpBody) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    try {
        const response = await authInstance.post('/api/v2/signup', JSON.stringify(body), config);
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 400) {
            console.error("400 Invalid Parameter:", response.statusText);
        } else if (response.status === 409) {
            console.error("409 Conflict:", response.statusText);
        } else if (response.status === 500) {
            console.error("500 Internal Server Error", response.statusText);
        } else {
            console.error("An unexpected error occurred:", response.statusText);
        }
    } catch (error) {
        throw error;
    } 
}

authInstance.postConfirmSignUp = async (body: ConfirmSignUpBody) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    try {
        const response = await authInstance.post('/api/v2/confirm', JSON.stringify(body), config);
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 400) {
            console.error("400 Bad Request:", response.statusText);
        } else if (response.status === 408) {
            console.error("408 Request Timeout:", response.statusText);
        } else {
            console.error("An unexpected error occurred:", response.statusText);
        }
    } catch (error) {
        throw error;
    } 
}

authInstance.postResendConfirm = async (body: EmailBody) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    try {
        const response = await authInstance.post('/api/v2/resend-confirm', JSON.stringify(body), config);
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 401) {
            console.error("401 Not Authorized:", response.statusText);
        } else if (response.status === 403) {
            console.error("401 User Not Confirm:", response.statusText);
        } else if (response.status === 404) {
            console.error("401 User Not Found:", response.statusText);
        } else if (response.status === 500) {
            console.error("500 Internal Server Error:", response.statusText);
        } else {
            console.error("An unexpected error occurred:", response.statusText);
        }
    } catch (error) {
        throw error;
    } 
}

authInstance.postLogin = async (body: LoginBody) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    try {
        const response = await authInstance.post('/api/v2/login', JSON.stringify(body), config);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        throw error;
    } 
}

authInstance.postChangePassword = async (body: ChangePasswordBody, accessToken: string) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await authInstance.post('/api/v2/change-password', JSON.stringify(body), config);
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 400) {
            console.error("400 Bad Request:", response.statusText);
        } else if (response.status === 401) {
            console.error("401 Not Authorized:", response.statusText);
        } else if (response.status === 500) {
            console.error("500 Internal Server Error:", response.statusText);
        } else {
            console.error("An unexpected error occurred:", response.statusText);
        }
    } catch (error) {
        throw error;
    } 
}

authInstance.postForgetPassword = async (body: EmailBody) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    try {
        const response = await authInstance.post('/api/v2/forgot-password', JSON.stringify(body), config);
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 400) {
            console.error("400 Bad Request:", response.statusText);
        } else if (response.status === 500) {
            console.error("500 Internal Server Error:", response.statusText);
        } else {
            console.error("An unexpected error occurred:", response.statusText);
        }
    } catch (error) {
        throw error;
    } 
}

authInstance.postConfirmForget = async (body: ConfirmForgotBody) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    try {
        const response = await authInstance.post('/api/v2/confirm-forgot', JSON.stringify(body), config);
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 400) {
            console.error("400 Bad Request:", response.statusText);
        } else if (response.status === 500) {
            console.error("500 Internal Server Error:", response.statusText);
        } else {
            console.error("An unexpected error occurred:", response.statusText);
        }
    } catch (error) {
        throw error;
    } 
}

export { authInstance };