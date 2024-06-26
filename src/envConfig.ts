// vite-env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_SAMPLE: string;
    readonly VITE_BACKEND_SERVER: string,
    readonly VITE_SCOKET: string,
    readonly VITE_ENVIRONMENT: string,
    readonly VITE_STRIPE_KEY: string,
    readonly VITE_BACKEND_SERVER_LOCAL: string,
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  