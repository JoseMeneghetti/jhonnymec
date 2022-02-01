import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const fireBaseCreateUserWithEmailAndPassword = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
    return { "code": 200, "data": user };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { "code": errorCode, "data": errorMessage };
  }

}

export const fireBaseSignInWithEmailAndPassword = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
    return { "code": 200, "data": user };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    return { "code": errorCode, "data": errorMessage };
  }
}

export const firebaseSignOut = async () => {
  const auth = getAuth();
  await signOut(auth).then(() => {
  }).catch((error) => {
    console.log(error)
  });

}