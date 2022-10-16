import { initializeApp, getApp, getApps } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider, getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { string } from "yup";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


const otherAppConfig = {
  apiKey: "AIzaSyDVMoVLWWvolofYOcTYA0JZ0QHyng72LAM",
  authDomain: "auth.bodasdehoy.com",
  //databaseURL: "https://bodasdehoy-1063-default-rtdb.firebaseio.com",
  projectId: "bodasdehoy-1063",
  //storageBucket: "bodasdehoy-1063.appspot.com",
  messagingSenderId: "593952495916",
  appId: "1:593952495916:web:c63cf15fd16a6796f6f489",
  measurementId: "G-GWQ17NF2YR",

  // apiKey: "AIzaSyCRxkvW5Vgsa5obq7b4Peslp_RN0PUjmys",
  // authDomain: "auth-bodas.firebaseapp.com",
  // projectId: "auth-bodas",
  // storageBucket: "auth-bodas.appspot.com",
  // messagingSenderId: "856588028724",
  // appId: "1:856588028724:web:cae47a47225f86f6037361"

};

if (initializeApp.length === 0) {
  initializeApp({})
}

const iniApp = () => {
  try {
    const firebaseClient = initializeApp(otherAppConfig);
    const appCheck = initializeAppCheck(firebaseClient, {
      provider: new ReCaptchaV3Provider('6LekwcchAAAAANJHB3yv2ZOx6v8PHu2DkF-ku3J8'),

      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed.
      isTokenAutoRefreshEnabled: true
    });
    return firebaseClient
  } catch (error) {
    console.log("error 1503", "appCheck en firebase.ts")
  }


}
const firebaseClient = iniApp()
const auth = getAuth()
//const storage = getStorage();

//Providers

const GoogleProvider = () => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  return provider;
};

const FacebookProvider = new FacebookAuthProvider();

export { otherAppConfig, firebaseClient, GoogleProvider, FacebookProvider, auth };



//storage


/* export async function upload (file:File,currentUser) {
  const fileRef = ref(storage,currentUser.uid +'.png');
  const snapshot = await uploadBytes(fileRef,file)
} */