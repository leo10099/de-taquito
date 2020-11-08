export const Config = () => ({
  HOST: process.env.HOST ?? 'http://localhost',
  PORT: process.env.PORT ?? 7777,
  WEB_URL: process.env.WEB_URL,
  IS_DEV: process.env.NODE_ENV === 'development',
  JTW_SECRET: process.env.JWT_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY,
  JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  DATABASE: {
    NAME: process.env.DATABASE_NAME ?? '',
    HOST: process.env.DATABASE_HOST ?? 'localhost',
    PORT: parseInt(process.env.DATABASE_PORT, 10) ?? 5432,
    USERNAME: process.env.DATABASE_USERNAME ?? '',
    PASSWORD: process.env.DATABASE_PASSWORD ?? '',
  },
  GOOGLE_AUTH: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  },
  MAILGUN: {
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN,
  },
});

export enum MainConfig {
  JTW_SECRET = 'JTW_SECRET',
  JWT_ACCESS_TOKEN_EXPIRY = 'JWT_ACCESS_TOKEN_EXPIRY',
  JWT_REFRESH_TOKEN_EXPIRY = 'JWT_REFRESH_TOKEN_EXPIRY',
  PORT = 'PORT',
  HOST = 'HOST',
  WEB_URL = 'WEB_URL',
  IS_DEV = 'IS_DEV',
}

export enum DatabaseConfig {
  NAME = 'DATABASE.NAME',
  HOST = 'DATABASE.HOST',
  PORT = 'DATABASE.PORT',
  USERNAME = 'DATABASE.USERNAME',
  PASSWORD = 'DATABASE.PASSWORD',
}

export enum GoogleOauthConfig {
  CLIENT_ID = 'GOOGLE_AUTH.CLIENT_ID',
  CLIENT_SECRET = 'GOOGLE_AUTH.CLIENT_SECRET',
  CALLBACK_URL = 'GOOGLE_AUTH.CALLBACK_URL',
}

export enum RapidApiConfig {
  RAPID_API_BASE_URL = 'RAPID_API_BASE_URL',
  RAPID_API_HOST = 'RAPID_API_HOST',
  RAPID_API_KEY = 'RAPID_API_KEY',
}

export enum MailgunConfig {
  MAILGUN_API_KEY = 'MAILGUN_API_KEY',
  MAILGUN_DOMAIN = 'MAILGUN_DOMAIN',
}
