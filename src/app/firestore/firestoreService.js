import cuid from "cuid";
import firebase from "../config/firebase";

const db = firebase.firestore();

export const dataFromSnapshot = (snapshot) => {
  if (!snapshot.exists) return undefined;

  const data = snapshot.data();

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      if (data[prop] instanceof firebase.firestore.Timestamp) {
        data[prop] = data[prop].toDate();
      }
    }
  }

  return {
    ...data,
    id: snapshot.id,
  };
};

export const listenToEventsFromFireStore = () => {
  return db.collection("events").orderBy("date");
};

export const listenToSingleEventFromFireStore = (eventId) => {
  return db.collection("events").doc(eventId);
};

export const addEventToFirestore = (event) => {
  return db.collection("events").add({
    ...event,
    hostedBy: "hamsa",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/21.jpg",
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: cuid(),
      dispayName: "waheed",
      photoURL: "https://randomuser.me/api/portraits/women/22.jpg",
    }),
  });
};

export const updateEventInFirestore = (event) => {
  db.collection("events").doc(event.id).update(event);
};

export const deleteeEventFromFirestore = (eventId) => {
  db.collection("events").doc(eventId).delete();
};

export const cancelEventToggle = (event) => {
  db.collection("events").doc(event.id).update({
    isCancelled: !event.isCancelled,
  });
};

export const setUserProfileData = (user) => {
  return db
    .collection("user")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};
