import { initializeApp, getApp, getApps } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider, getAuth, OAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { string } from "yup";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";


const otherAppConfig = {
  apiKey: "AIzaSyDVMoVLWWvolofYOcTYA0JZ0QHyng72LAM",
  authDomain: "auth.bodasdehoy.com",
  projectId: "bodasdehoy-1063",
  messagingSenderId: "593952495916",
  appId: "1:593952495916:web:c63cf15fd16a6796f6f489",
  measurementId: "G-GWQ17NF2YR",
};

if (initializeApp.length === 0) {
  initializeApp({})
}

const iniApp = () => {
  try {
    const firebaseClient = initializeApp(otherAppConfig);
    return firebaseClient
  } catch (error) {
    console.log("error 1503", "appCheck en firebase.ts")
  }
}
const firebaseClient = iniApp()
const auth = getAuth()

const GoogleProvider = () => {
  const provider = new GoogleAuthProvider();
  return provider;
};

const FacebookProvider = new FacebookAuthProvider();

const AppleProvidor = () => {
  try {
    const provider = new OAuthProvider('apple.com');
    return provider
  } catch (error) {
    console.log("error 1504", "AppleProvidor en firebase.ts", error)
  }
}

export { firebaseClient, GoogleProvider, FacebookProvider, auth, AppleProvidor };

