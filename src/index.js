import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArwu8aulrjz_rgzsaulvv2pU81IZZK2rY",
  authDomain: "fir-9-mh.firebaseapp.com",
  projectId: "fir-9-mh",
  storageBucket: "fir-9-mh.appspot.com",
  messagingSenderId: "809118794810",
  appId: "1:809118794810:web:6da5e5fade713e19aca103",
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// queries
const q = query(colRef, where("author", "==", "patrick rothfuss"));

// real time collection data

onSnapshot(colRef, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

// adding docs
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});

// deleting docs
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
