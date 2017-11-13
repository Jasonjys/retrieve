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
const getRef = () => firebaseApp.database().ref();
const auth = firebaseApp.auth()

export default {
    auth,
    signInWithEmailAndPassword: () => {
        return auth.signInWithEmailAndPassword();
    },
    getCurrentUser: () => {
        return auth.currentUser;
    },
    signOut: () => {
        return auth.signOut();
    },
    lostPostsRef: getRef().child('lostPosts'),
    foundPostsRef: getRef().child('foundPosts'),
    usersRef: getRef().child('users')
}