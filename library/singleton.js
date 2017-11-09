import {firebaseApp} from '../firebaseConfig';
export default (function() {
    var currentUser;

    function getCurrentUser() {
        return firebaseApp.auth().currentUser;
    }

    return {
        getCurrentUser: function() {
            if (!currentUser) {
                currentUser = getCurrentUser();
            }
            return currentUser;
        },
        signOut: function() {
            currentUser = null;
            return new Promise((resolve, reject) => {
                firebaseApp.auth().signOut().then(() => resolve());
            })
        }
    }
})();