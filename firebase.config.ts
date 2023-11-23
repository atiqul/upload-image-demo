import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtAnuErb5C7oPBywkN2aI38FPorc5H-xg",
  authDomain: "file-upload-2c7e6.firebaseapp.com",
  projectId: "file-upload-2c7e6",
  storageBucket: "file-upload-2c7e6.appspot.com",
  messagingSenderId: "589959261416",
  appId: "1:589959261416:web:c65ca26eda6af477fcad5d",
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
