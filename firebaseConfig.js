import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCy06AYOySGIMILWjBfCYBpG-HIWNqcHQw",
  authDomain: "retrieve-55769.firebaseapp.com",
  databaseURL: "https://retrieve-55769.firebaseio.com",
  projectId: "retrieve-55769",
  storageBucket: "",
  messagingSenderId: "569280491909"
};

export const firebaseApp = firebase.initializeApp(config);
const getRef = () => firebaseApp.database().ref();

export const lostPostsRef = getRef().child('lostPosts');
export const foundPostsRef = getRef().child('foundPosts');
export const usersRef = getRef().child('users');