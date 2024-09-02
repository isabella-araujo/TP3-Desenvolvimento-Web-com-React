import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firabase";

export async function logarUsuario(email, senha) {
    let retorno = new Object();
    await signInWithEmailAndPassword(auth, email, senha)
        .then((credenciais) => {
            retorno.id = credenciais.user.uid;
            retorno.email = email;
            retorno.senha = senha;
        })
        .catch((error) => {
            console.log(`${error.code} = ${error.messsage}`)
            retorno.erro = "Login Inválido";
        })
    return retorno;
}