import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 4000,
  HOSTAWAY_ACCOUNT_ID: process.env.HOSTAWAY_ACCOUNT_ID!,
  HOSTAWAY_API_KEY: process.env.HOSTAWAY_API_KEY!
};