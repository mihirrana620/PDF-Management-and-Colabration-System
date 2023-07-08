import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"


const firebaseConfig = {
  apiKey: "AIzaSyATspMkQrIo9QuX5AM5ce55B5Y43S5A8kc",
  authDomain: "pdf-management-system-c39f9.firebaseapp.com",
  projectId: "pdf-management-system-c39f9",
  storageBucket: "pdf-management-system-c39f9.appspot.com",
  messagingSenderId: "94527742219",
  appId: "1:94527742219:web:1d4069d10c5eecd84b420e"
};
  

const fire = firebase.initializeApp(firebaseConfig)


export default fire