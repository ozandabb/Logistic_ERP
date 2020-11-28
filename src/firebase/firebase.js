import firebase from 'firebase/app'
import "firebase/database";
 
const config = {
    apiKey: "AIzaSyA45Xhe9am4E63n_WI0OYBi_zbq3zLRfCA",
    authDomain: "ordertrakingerp.firebaseapp.com",
    databaseURL: "https://ordertrakingerp.firebaseio.com",
    projectId: "ordertrakingerp",
    storageBucket: "ordertrakingerp.appspot.com",
    messagingSenderId: "76053768648",
    appId: "1:76053768648:web:9f76c3aaabe3007cc7f8fd"
};
 
firebase.initializeApp(config);

export default firebase.database();
