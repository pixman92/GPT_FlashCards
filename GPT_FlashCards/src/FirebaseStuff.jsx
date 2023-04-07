// import {firebase} from "@firebase/app";
// import {firestore} from "@firebase/firestore";
// import "firebase/firestore";

// test comment

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { useState } from "react";

function MyFirebaseFunctions() {
  const firebaseConfig = {
    // Firebase config goes here
    apiKey: "AIzaSyANM6e546I_F3L-zWMX8glAwlLmlkilZ_k",
    authDomain: "testgpt-3434d.firebaseapp.com",
    projectId: "testgpt-3434d",
    storageBucket: "testgpt-3434d.appspot.com",
    messagingSenderId: "522017363985",
    appId: "1:522017363985:web:3c6080d35edae8a10139b0",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  // const db = firebase.firestore();

  // ======================

  const [deckIds, setDeckIds] = useState([]);

  // ======================  
  function generateUniqueId() {
    // Generate a random number between 0 and 999999999999
    const randomNumber = Math.floor(Math.random() * 1000000000000);

    // Convert the random number to a string and pad it with leading zeros until it has 12 digits
    const paddedNumber = randomNumber.toString().padStart(12, "0");

    return paddedNumber;
  }
  // ======================

  // this function works - somewhat tested (no edge cases, so far)
  const getAllDecksForUser = async (userId) => {
    // Get a reference to the user's profile document
    // const profileRef = doc(db, "users", userId);

    const deckRef = doc(db, "users", userId);
    const cardsCollectionRef = collection(deckRef, "decks");
 
    const querySnapshot = await getDocs(cardsCollectionRef);
    const data = querySnapshot.docs.map(doc => doc.data());

    const deckIdsArr=[]; 
    const data2 = querySnapshot.forEach((doc) => {
      deckIdsArr.push(doc);
    });

    setDeckIds('hello');

    console.log(data);
    console.log(deckIds)
    debugger;
  }

  // this function works
  const createUser = async (name, email) => {
    try {
      debugger;
      const docRef = await addDoc(collection(db, "users"), {
        first: name,
        email: email,
        decks: {},
      });
      console.log("User created successfully", docRef.id);
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  // this function works
  const updateUserName = async (userId, newName) => {
    try {
      // Get a reference to the document you want to update
      const docRef = doc(db, "users", userId);
      // Update the field with a new value
      await updateDoc(docRef, { name: newName });

      console.log("User name updated successfully");
    } catch (error) {
      console.error("Error updating user name: ", error);
    }
  };

  // should work - untested
  const updateUserEmail = async (userId, newEmail) => {
    try {
      // Get a reference to the document you want to update
      const docRef = doc(db, "users", userId);
      // Update the field with a new value
      await updateDoc(docRef, { email: newEmail });
      console.log("User email updated successfully");
    } catch (error) {
      console.error("Error updating user email: ", error);
    }
  };

  // should work - untested
  const createDeck = async (userId, deckName) => {
    try {
      const docRef = await addDoc(collection(db, "users", userId, "decks"), {
        nameOfDeck: deckName,
        cards: {},
        id: generateUniqueId(),
      });
      console.log("Deck created successfully with ID: ", docRef.id);
    } catch (error) {
      console.error("Error creating deck: ", error);
    }
  };

  // const getDec = async (userId) =>{
  //   try{
  //     const docRef = await addDoc()
  //   }
  // }

  const updateDeckName = async (userId, deckId, newName) => {
    try {
      await db
        .collection("users")
        .doc(userId)
        .collection("decks")
        .doc(deckId)
        .update({ name: newName });
      console.log("Deck name updated successfully");
    } catch (error) {
      console.error("Error updating deck name: ", error);
    }
  };

  const createCard = async (userId, deckId, question, answer) => {
    try {
      const cardRef = await db
        .collection("users")
        .doc(userId)
        .collection("decks")
        .doc(deckId)
        .collection("cards")
        .add({
          question: question,
          answer: answer,
        });
      console.log("Card created successfully with ID: ", cardRef.id);
    } catch (error) {
      console.error("Error creating card: ", error);
    }
  };

  const updateCardQuestion = async (userId, deckId, cardId, newQuestion) => {
    try {
      await db
        .collection("users")
        .doc(userId)
        .collection("decks")
        .doc(deckId)
        .collection("cards")
        .doc(cardId)
        .update({ question: newQuestion });
      console.log("Card question updated successfully");
    } catch (error) {
      console.error("Error updating card question: ", error);
    }
  };

  const updateCardAnswer = async (userId, deckId, cardId, newAnswer) => {
    try {
      await db
        .collection("users")
        .doc(userId)
        .collection("decks")
        .doc(deckId)
        .collection("cards")
        .doc(cardId)
        .update({ answer: newAnswer });
      console.log("Card answer updated successfully");
    } catch (error) {
      console.error("Error updating card answer: ", error);
    }
  };

  // ======================
  const [text, setText] = useState("");

  function handleTextChange(event) {
    setText(event.target.value);
  }
  // ======================
  const whereEmail = (email) => {
    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("email", "==", email));

    const docIds = [];

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        docIds.push(doc.id);
      });
      console.log(docIds); // an array of document IDs for matching documents
    });
    getDocs(q).then((querySnapshot) => {
      // debugger;
      const documents = querySnapshot.docs.map((doc) => {
        doc.data();
      });
      console.log(documents); // an array of matching documents
    });
    // .catch((error) => {
    //   console.log("Error getting documents:", error);
    // });
  };

  const getID = () => {
    const docRef = doc(db, "users");

    getDoc(docRef)
      .then((doc) => {
        if (doc.exists()) {
          const data = doc.data();
          const ids = [];

          for (const [field, value] of Object.entries(data)) {
            if (typeof value === "object" && value.id) {
              ids.push(value.id);
            }
          }

          console.log(ids); // an array of connecting IDs
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  };

  return (
    <div>
      <textarea value={text} onChange={handleTextChange} />
      <button
        onClick={() => {
          let parsed = text.split(" ");

          if (parsed[0] == "whereEmail") {
            whereEmail(parsed[1]);
          }

          if (parsed[0] == "db") console.log("db", db);

          if (parsed[0] == "createUser") {
            createUser(parsed[1], parsed[2]);
          }

          if (parsed[0] == "getID") {
            getID();
          } 

          if (parsed[0] == "updateUserName") {
            updateUserName(parsed[1], parsed[2]);
          }
          if (parsed[0] == "createDeck") {
            createDeck(parsed[1], parsed[2]); 
          }
          if (parsed[0] == 'getAllDecksForUser'){
            getAllDecksForUser(parsed[1])
          }
        }}
      >
        Submit
      </button>
      <div>
        whereEmail sam@gmail.com
        <div>updateUserName r1IprRhUAPBQA0zmORp7 tim</div>
        {/* <div>createDeck r1IprRhUAPBQA0zmORp7 beach</div> */}
        getAllDecksForUser r1IprRhUAPBQA0zmORp7
      </div>
    </div>
  );
}

// createUser('sam', 'sam@gmail.com')

export default MyFirebaseFunctions;

// const instance = ReactTestUtils.renderIntoDocument(<MyComponent />);
// instance.myFunction();
