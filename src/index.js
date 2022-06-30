import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArwu8aulrjz_rgzsaulvv2pU81IZZK2rY",
  authDomain: "fir-9-mh.firebaseapp.com",
  projectId: "fir-9-mh",
  storageBucket: "fir-9-mh.appspot.com",
  messagingSenderId: "809118794810",
  appId: "1:809118794810:web:6da5e5fade713e19aca103",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let books = [];
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    });
    console.log(books);
  })
  .catch((err) => {
    console.log(err.message);
  });

// adding document
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// adding document
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
