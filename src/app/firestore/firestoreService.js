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
    .collection("users")
    .doc(user.uid)
    .set({
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
};

export const getUserProfile = (userId) => {
  return db.collection("users").doc(userId);
};

export const UpdateUserProfile = async (profile) => {
  const user = firebase.auth().currentUser;

  try {
    if (user.displayName !== profile.dispayName) {
      await user.updateProfile({
        displayName: profile.dispayName,
      });
    }
    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
};

export const updateUserProfilePhoto = async (downloadURL, filename) => {
  const user = firebase.auth().currentUser;
  const userDocRef = db.collection("users").doc(user.uid);
  try {
    const userDoc = await userDocRef.get();

    if (!userDoc.data().photoURL) {
      await db.collection("users").doc(user.uid).update({
        photoURL: downloadURL,
      });
      await user.updateProfile({
        photoURL: downloadURL,
      });
    }

    return await db.collection("users").doc(user.uid).collection("photos").add({
      name: filename,
      url: downloadURL,
    });
  } catch (error) {
    throw error;
  }
};

export const getUserPhotos = (userUid) => {
  return db.collection("users").doc(userUid).collection("photos");
};

export const setMainPhoto = async (photo) => {
  const user = firebase.auth().currentUser;

  try {
    await db.collection("users").doc(user.uid).update({
      photoURL: photo.url,
    });

    return await user.updateProfile({
      photoURL: photo.url,
    });
  } catch (error) {
    throw error;
  }
};


export const deletePhotoFromCollection = (photoId)=>{
  const userUid = firebase.auth().currentUser.uid
  return db.collection('users').doc(userUid).collection('photos').doc(photoId).delete()
}