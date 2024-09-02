// Crie uma página com um formulário com useForm que permita fazer login no Firebase (crie as contas diretamente no Firebase).

import React, { useEffect, useState } from 'react'
import '../style.css'
import { useForm } from 'react-hook-form';
import { logarUsuario } from '../infra/usuarios';

const regexNumerico = /^\d+$/;
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Exercise15() {
  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();

  async function onSubmit(dados) {
    const usuario = await logarUsuario(dados.email, dados.senha);
    if(usuario.id) {
      alert("Usuario " + usuario.id + " logado com sucesso.");
    } else {
      alert("Erro ao logar usuário.");
    }
  }

  return (
    <form
      className='container-form'
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3>Login</h3>

      <input
        placeholder='Email'
        {...register("email", {
          required: "Email é obrigatório.",
          validate: {
            matchPattern: (value) => regexEmail.test(value) || "Email deve ser um email válido."
          }
        })}
      />

      {errors.email && <p>{errors.email.message}</p>}

      <input
        placeholder='Senha'
        type='password'
        {...register("senha", {
          required: "Senha é obrigatório.",
          validate: {
            minLength: (value) => value.length > 0 || "Senha inválida.",
          },
        })}
      />

      {errors.senha && <p>{errors.senha.message}</p>}

      <input type="submit" value="Entrar" />
    </form>
  );
}
