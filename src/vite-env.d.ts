/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_AUTH_ENDPOINT: string;
    readonly VITE_PREDICT_ENDPOINT: string;
    readonly VITE_LESSON_ENDPOINT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}