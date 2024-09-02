// Crie uma página com o formulário da questão anterior, persistindo os dados no Firestore = INSERIR.

import React from 'react'
import '../style.css'
import { useForm } from 'react-hook-form';
import { addDado } from '../infra/crud';

const regexNumerico = /^\d+$/;
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Exercise9() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function onSubmit(dados) {
    let id = await addDado(dados);

    if(id) {
      alert("Formulário Enviado! - " + JSON.stringify(dados));
    } else {
      alert("Erro ao enviar formulário!");
    }
  }

  return (
    <form
      className='container-form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3>Formulário</h3>
      <input
        placeholder='Nome'
        {...register("nome", {
          required: "Nome é obrigatório.",
          validate: {
            minLength: (value) => value.length >= 3 || "Nome inválido.",
          }
        })}
      />

      {errors.nome && <p>{errors.nome.message}</p>}

      <input
        placeholder='Email'
        {...register("email", {
          required: "Email é obrigatório.",
          validate: {
            minLength: (value) => value.length >= 3 || "Email inválido.",
            matchPattern: (value) => regexEmail.test(value) || "Email deve ser um email válido."
          }
        })}
      />

      {errors.email && <p>{errors.email.message}</p>}

      <input
        placeholder='Telefone'
        {...register("tel", {
          required: "Telefone é obrigatório.",
          validate: {
            minLength: (value) => value.length >= 8 || "Telefone inválido.",
            matchPattern: (value) => regexNumerico.test(value) || "Telefone deve conter apenas números.",
          },
        })}
      />

      {errors.tel && <p>{errors.tel.message}</p>}

      <input type="submit" value="Salvar" />
    </form>
  );
}
