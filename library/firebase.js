import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCy06AYOySGIMILWjBfCYBpG-HIWNqcHQw",
  authDomain: "retrieve-55769.firebaseapp.com",
  databaseURL: "https://retrieve-55769.firebaseio.com",
  projectId: "retrieve-55769",
  storageBucket: "",
  messagingSenderId: "569280491909"
};

export default (() => {
  initializeApp = () => {
    this.firebaseApp = firebase.initializeApp(config);
  }

  getRef = () => {
    return firebaseApp.database().ref();
  }

  return {
    getCurrentUser: () => {
      return this.firebaseApp.auth().currentUser;
    },
    getAuth: () => {
      if (!this.firebaseApp) {
        this.initializeApp();
      }
      return this.firebaseApp.auth();
    },
    getLostPostsRef: () => {
      return this.getRef().child('lostPosts')
    },
    getFoundPostsRef: () => {
      return this.getRef().child('foundPosts')
    },
    getUsersRef: () => {
      return this.getRef().child('users')
    },
    signOut: () => {
      return this.firebaseApp.auth().signOut()
    }
  }
})()