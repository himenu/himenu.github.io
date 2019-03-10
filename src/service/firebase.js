import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBDYFqo2J48O_Ugo5W8eCvuQG_ahOkdf_0",
    authDomain: "himenu-datacore.firebaseapp.com",
    databaseURL: "https://himenu-datacore.firebaseio.com",
    projectId: "himenu-datacore",
    storageBucket: "himenu-datacore.appspot.com",
    messagingSenderId: "371668232942"
}
firebase.initializeApp(config)

export default {
 database: firebase.database()
}