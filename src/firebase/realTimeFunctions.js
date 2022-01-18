import { getDatabase, get, ref, set, child } from "firebase/database";

export function firebaseGetDocsClient(setTableClient) {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `users/`)).then((snapshot) => {
    if (snapshot.exists()) {
      setTableClient(snapshot.val())
    }
  }).catch((error) => {
    console.error(error);
  });
}

export function firebaseGetDocsNotas(setTableNota) {
  const dbRef = ref(getDatabase());

  get(child(dbRef, `notas/`)).then((snapshot) => {
    if (snapshot.exists()) {
      setTableNota(snapshot.val())
    }
  }).catch((error) => {
    console.error(error);
  });
}

export function writeUserDataClient(client) {
  const db = getDatabase();
  set(ref(db, 'users/' + client.id), client);
}

export function writeUserDataNota(nota, setNota) {
  const db = getDatabase();
  const dbRef = ref(getDatabase());

  get(child(dbRef, `notas/`)).then((snapshot) => {
    if (snapshot.exists()) {
      const result = snapshot.val()

      const id = Object.keys(result) ? Object.keys(result).length + 1 : 0

      nota.id = id

      const data = new Date();
      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();
      const dataAtual = dia + '/' + mes + '/' + ano;

      setNota({ ...nota, id: id, data: dataAtual })

      nota.data = dataAtual

      set(ref(db, 'notas/' + id), nota);
    }
  }).catch((error) => {
    console.error(error);
  });

}







