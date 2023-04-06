// import {firebase} from "@firebase/app";
// import {firestore} from "@firebase/firestore";
// import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
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

  
  const createUser = async (name, email) => {
    try {
      debugger;
      const docRef = await addDoc(collection(db, 'users'), {
        first: name,
        email: email
      });
      // await db.collection("users").add({
      //   name: name,
      //   email: email,
      //   decks: {},
      // });
      console.log("User created successfully", docRef.id);
    } catch (error) {
      console.error("Error creating user: ", error);
    }
  };

  const updateUserName = async (userId, newName) => {
    try {
      await db.collection("users").doc(userId).update({ name: newName });
      console.log("User name updated successfully");
    } catch (error) {
      console.error("Error updating user name: ", error);
    }
  };

  const updateUserEmail = async (userId, newEmail) => {
    try {
      await db.collection("users").doc(userId).update({ email: newEmail });
      console.log("User email updated successfully");
    } catch (error) {
      console.error("Error updating user email: ", error);
    }
  };

  const createDeck = async (userId, deckName) => {
    try {
      const deckRef = await db
        .collection("users")
        .doc(userId)
        .collection("decks")
        .add({
          name: deckName,
          cards: {},
        });
      console.log("Deck created successfully with ID: ", deckRef.id);
    } catch (error) {
      console.error("Error creating deck: ", error);
    }
  };

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

  const [text, setText] = useState("");

  function handleTextChange(event) {
    setText(event.target.value);
  }

  return (
    <div>
      <textarea value={text} onChange={handleTextChange} />
      <button onClick={()=>{
        let parsed = text.split(" ");

        if(parsed[0] == 'db')
          console.log('db', db);

        if(parsed[0]=="createUser"){
          createUser(parsed[1], parsed[2]);
        }
      }}>Submit</button>
    </div>
  );
}

// createUser('sam', 'sam@gmail.com')

export default MyFirebaseFunctions;

// const instance = ReactTestUtils.renderIntoDocument(<MyComponent />);
// instance.myFunction();
