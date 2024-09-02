// Crie uma página com um formulário simples, usando o hook useForm e 3 campos obrigatórios: nome, email e telefone.

import React from 'react'
import '../style.css'
import { useForm } from 'react-hook-form';

const regexNumerico = /^\d+$/;

export default function Exercise7() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(dados) {
    alert("Formulário Enviado! - " + JSON.stringify(dados));

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
