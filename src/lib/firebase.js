import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCGhPMDXYJIgc8ZUoG9obrrC-nHdHpGCHw",
    authDomain: "instagram-clone-b9154.firebaseapp.com",
    projectId: "instagram-clone-b9154",
    storageBucket: "instagram-clone-b9154.appspot.com",
    messagingSenderId: "356650744163",
    appId: "1:356650744163:web:186fafff3a50da9e81bb56"
};

const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore;


export {firebase,FieldValue};
