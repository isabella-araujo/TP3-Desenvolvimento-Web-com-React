import { collection, addDoc, getDocs, getDoc, doc, deleteDoc, setDoc } from "firebase/firestore"; 
import { db } from "./firabase";

export async function addDado(dados) {
    const docRef = await addDoc(collection(db, "dados"), dados);
    return docRef.id;
}

export async function getDados() {
    let retorno;
    await getDocs(collection(db, "dados"))
        .then((querySnapshot) => {
            retorno = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        });
    return retorno;
}

export async function getDado(id) {
    const docRef = doc(db, "dados", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
}

export async function excluirDados(id) {
    await deleteDoc(doc(db, "dados", id));
}

export async function alterarDado(dado) {
    await setDoc(doc(db, "dados", dado.id), dado);
}

