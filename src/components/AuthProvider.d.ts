import React, { ReactNode } from 'react';

declare module '@components/AuthProvider' {
    interface AuthProviderProps {
        children: ReactNode;
    }

    interface AuthContextType {
        isLoggedIn: boolean;
        userEmail: string;
        access_token: string;
        login: (email: string, accessToken: string) => void;
        logout: () => void;
    }

    export const useAuth: () => AuthContextType;

    export const AuthProvider: (props: AuthProviderProps) => JSX.Element;
}