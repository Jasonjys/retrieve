import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCy06AYOySGIMILWjBfCYBpG-HIWNqcHQw",
    authDomain: "retrieve-55769.firebaseapp.com",
    databaseURL: "https://retrieve-55769.firebaseio.com",
    projectId: "retrieve-55769",
    storageBucket: "",
    messagingSenderId: "569280491909"
  };
  
const firebaseApp = firebase.initializeApp(config);
const getRef = () => {
    return firebaseApp.database().ref();
}
export const itemsRef = getRef().child('items');