import { getDatabase, get, ref, set, child } from "firebase/database";

export function firebaseGetDocs(setTableClient) {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
      setTableClient(snapshot.val())
    }
  }).catch((error) => {
    console.error(error);
  });


}

export function writeUserData(client) {

  const db = getDatabase();
  set(ref(db, 'users/' + client.id), client);
}








