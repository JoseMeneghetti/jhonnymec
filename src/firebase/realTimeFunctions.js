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

  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = dia + '/' + mes + '/' + ano;

  let id = 0

  if (client?.id !== '') {
    client.dataAlteracao = dataAtual
    set(ref(db, 'users/' + client.id), client);
  } else {
    get(child(dbRef, `users/`)).then((snapshot) => {

      if (snapshot.exists()) {
        const result = snapshot.val()

        id = Object.keys(result).reduce(function (a, b) {
          return Math.max(a, b);
        });
        id++
      }

      client.data = dataAtual
      client.id = id

      set(ref(db, 'users/' + id), client);

    }).catch((error) => {
      console.error(error);
    });
  }
}

export function writeUserDataNota(nota, setNota, cancelada) {
  console.log(cancelada,  'cancelada')
  const db = getDatabase();
  const dbRef = ref(getDatabase());

  const data = new Date();
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  const dataAtual = dia + '/' + mes + '/' + ano;

  let id = 0

  if (nota?.id !== '') {
    if (cancelada) {
      nota.status = 'cancelada'
    }
    nota.dataAlteracao = dataAtual
    set(ref(db, 'notas/' + nota.id), nota);
  } else {
    get(child(dbRef, `notas/`)).then((snapshot) => {

      if (snapshot.exists()) {
        const result = snapshot.val()

        id = Object.keys(result).reduce(function (a, b) {
          return Math.max(a, b);
        });
        id++
      }

      nota.status = "ativa"
      nota.id = id
      nota.data = dataAtual

      setNota({ ...nota, id: id, data: dataAtual })

      set(ref(db, 'notas/' + id), nota);

    }).catch((error) => {
      console.error(error);
    });

  }

}



