'use client';

import { init } from '@instantdb/react';
import { schema } from './instant.schema';

if (!process.env.NEXT_PUBLIC_INSTANT_APP_ID) {
  throw new Error('NEXT_PUBLIC_INSTANT_APP_ID is not set');
}

export const db = init({
  appId: process.env.NEXT_PUBLIC_INSTANT_APP_ID,
  schema,
});
