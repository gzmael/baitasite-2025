import type {NextConfig} from 'next';

import {createJiti} from 'jiti';
const jiti = createJiti(import.meta.url);

jiti.esmResolve('./src/env.ts');

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
