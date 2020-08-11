import { config } from 'dotenv';
config();

export const port = process.env.PORT as string;
export const db_user = process.env.DB_USER as string;
export const db_password = process.env.DB_PASSWORD as string;
export const db_host = process.env.DB_HOST as string;
export const db_name = process.env.DB_NAME as string;
export const secret_token = process.env.SECRET_TOKEN as string;
export const expires_in = process.env.EXPIRES_IN as string;
export const api_key = process.env.API_KEY as string;