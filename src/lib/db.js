import { init, id } from '@instantdb/react';

const APP_ID = import.meta.env.VITE_INSTANTDB_APP_ID;

const db = init({ appId: APP_ID });

export { db, id };
