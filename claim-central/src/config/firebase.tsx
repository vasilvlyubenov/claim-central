import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCBcG7QK5_jBx0sF803JILdr5Bcj9HowHI',
    authDomain: 'claim-central.firebaseapp.com',
    databaseURL: 'https://claim-central-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'claim-central',
    storageBucket: 'claim-central.appspot.com',
    messagingSenderId: '1009744448406',
    appId: '1:1009744448406:web:d8eb7c300464a9feffebb7',
    measurementId: 'G-STHHG1D7DR'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);