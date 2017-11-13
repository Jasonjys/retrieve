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

export default {
    auth: firebaseApp.auth(),
    getCurrentUser: () => {
        return firebaseApp.auth().currentUser;
    },
    signOut: () => {
        return firebaseApp.auth().signOut();
    },
    lostPostsRef: getRef().child('lostPosts'),
    foundPostsRef: getRef().child('foundPosts'),
    usersRef: getRef().child('users')
}