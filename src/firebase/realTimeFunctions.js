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
  const dbRef = ref(getDatabase());
  let id = 0

  get(child(dbRef, `users/`)).then((snapshot) => {

    if (snapshot.exists()) {
      const result = snapshot.val()

      id = Object.keys(result).reduce(function (a, b) {
        return Math.max(a, b);
      });
      id++
    }

    client.id = id

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = dia + '/' + mes + '/' + ano;

    client.data = dataAtual

    set(ref(db, 'users/' + id), client);

  }).catch((error) => {
    console.error(error);
  });
}

export function writeUserDataNota(nota, setNota) {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  let id = 0

  get(child(dbRef, `notas/`)).then((snapshot) => {

    if (snapshot.exists()) {
      const result = snapshot.val()

      id = Object.keys(result).reduce(function (a, b) {
        return Math.max(a, b);
      });
      id++
    }

    nota.id = id

    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const dataAtual = dia + '/' + mes + '/' + ano;

    setNota({ ...nota, id: id, data: dataAtual })

    nota.data = dataAtual

    set(ref(db, 'notas/' + id), nota);

  }).catch((error) => {
    console.error(error);
  });

}







