import {initializeApp, applicationDefault, cert} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({
    credential: cert(JSON.parse(fs.readFileSync('./firebaseKey.json')))
});

export const db = getFirestore();
