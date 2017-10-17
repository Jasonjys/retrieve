import * as firebase from 'firebase';

// const config = {
//   apiKey: "AIzaSyBrxoHAQNjn08MWXXMwyivst0nC2N2zjUg",
//   authDomain: "retrieve-a82e2.firebaseapp.com",
//   databaseURL: "https://retrieve-a82e2.firebaseio.com",
//   projectId: "retrieve-a82e2",
//   storageBucket: "retrieve-a82e2.appspot.com",
//   messagingSenderId: "709609702934"
// };

export const firebaseApp = firebase.initializeApp(config);
const getRef = () => firebaseApp.database().ref();

export const itemsRef = getRef().child('items');
export const lostPostRef = getRef().child('lostPost');
export const foundPostRef = getRef().child('foundPost');
export const usersRef = getRef().child('users');