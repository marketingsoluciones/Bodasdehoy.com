import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDVMoVLWWvolofYOcTYA0JZ0QHyng72LAM",
    authDomain: "bodasdehoy-1063.firebaseapp.com",
    databaseURL: "https://bodasdehoy-1063-default-rtdb.firebaseio.com",
    projectId: "bodasdehoy-1063",
    storageBucket: "bodasdehoy-1063.appspot.com",
    messagingSenderId: "593952495916",
    appId: "1:593952495916:web:c63cf15fd16a6796f6f489",
    measurementId: "G-GWQ17NF2YR"
  };

  const firebaseClient = firebase.initializeApp(firebaseConfig) 
  
  

  //Providers
  const GoogleProvider = () => {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      
      return provider
  } 

  const FacebookProvider = new firebase.auth.FacebookAuthProvider()


export { firebaseClient, GoogleProvider, FacebookProvider}
