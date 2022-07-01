import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth();

// collection ref
const colRef = collection(db, "books");

// queries
const q = query(colRef, orderBy("createAt"));

// real time collection data

onSnapshot(q, (snapshot) => {
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
    createAt: serverTimestamp(),
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

// get a single document
const docRef = doc(db, "books", "1uc02K4JDnMj245ruOua");

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

// updating a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateForm.id.value);

  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateForm.reset();
  });
});

// signing users up
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("User created:", cred.user);
      signupForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});
