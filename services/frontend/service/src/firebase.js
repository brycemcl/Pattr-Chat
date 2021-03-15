import firebase from 'firebase/app'

// add the Firebase products that you want to use - we just want to use authentication
import 'firebase/auth'

// firebase config object
const firebaseConfig = {
  apiKey: 'AIzaSyCUp0fhA4gQaSIz4hUI3B15KdzgGf4HbW8',
  authDomain: 'pattr-d50ff.firebaseapp.com',
  projectId: 'pattr-d50ff',
  storageBucket: 'pattr-d50ff.appspot.com',
  messagingSenderId: '997387685713',
  appId: '1:997387685713:web:89454f9f1fd8e12f558d70',
  measurementId: 'G-ZCLPCYBZSR'
}

// initialize Firebase
firebase.initializeApp(firebaseConfig)

export default firebase
