import * as firebase from 'firebase';

// const config = {
//     apiKey: "AIzaSyCy06AYOySGIMILWjBfCYBpG-HIWNqcHQw",
//     authDomain: "retrieve-55769.firebaseapp.com",
//     databaseURL: "https://retrieve-55769.firebaseio.com",
//     projectId: "retrieve-55769",
//     storageBucket: "",
//     messagingSenderId: "569280491909"
//   };

const config = {
apiKey: "AIzaSyBrxoHAQNjn08MWXXMwyivst0nC2N2zjUg",
authDomain: "retrieve-a82e2.firebaseapp.com",
databaseURL: "https://retrieve-a82e2.firebaseio.com",
projectId: "retrieve-a82e2",
storageBucket: "retrieve-a82e2.appspot.com",
messagingSenderId: "709609702934"
};
  
export const firebaseApp = firebase.initializeApp(config);
const getRef = () => firebaseApp.database().ref();

export const itemsRef = getRef().child('items');
export const usersRef = getRef().child('users');