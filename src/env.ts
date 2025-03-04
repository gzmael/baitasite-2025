import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string().min(1),
    INTER_CLIENT_ID: z.string().min(1),
    INTER_CLIENT_SECRET: z.string().min(1),
    RECAPTCHA_SECRET: z.string().min(1),
    TOKEN_API: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    DIRECT_URL: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_ANALYTICS_ID: z.string().min(1),
    NEXT_PUBLIC_RECAPTCHA: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_MAPS: z.string().min(1),
    NEXT_PUBLIC_MAP_BOX_TOKEN: z.string().min(1),
    NEXT_PUBLIC_VERCEL_URL: z.string().min(1),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    INTER_CLIENT_ID: process.env.INTER_CLIENT_ID,
    INTER_CLIENT_SECRET: process.env.INTER_CLIENT_SECRET,
    RECAPTCHA_SECRET: process.env.RECAPTCHA_SECRET,
    NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    NEXT_PUBLIC_RECAPTCHA: process.env.NEXT_PUBLIC_RECAPTCHA,
    NEXT_PUBLIC_GOOGLE_MAPS: process.env.NEXT_PUBLIC_GOOGLE_MAPS,
    NEXT_PUBLIC_MAP_BOX_TOKEN: process.env.NEXT_PUBLIC_MAP_BOX_TOKEN,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
    TOKEN_API: process.env.TOKEN_API,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});