declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_URL: string;
    MOBILE_CLIENT: string;
    API_URL: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    CLOUD_NAME: string;
    API_KEY: string;
    API_SECRET: string;
    FACEBOOK_SECRET: string;
    FACEBOOK_ID: string;
    GOOGLE_SECRET: string;
    GOOGLE_ID: string;
    NODE_ENV: 'development' | 'production';
  }
}
