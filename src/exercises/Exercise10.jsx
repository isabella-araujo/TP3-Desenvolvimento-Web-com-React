// Crie uma página com o formulário da questão anterior, mostrando os dados gravados no Firestore em uma lista simples = LISTAR.

import React, { useEffect, useState } from 'react'
import '../style.css'
import { useForm } from 'react-hook-form';
import { addDado, getDados } from '../infra/crud';

const regexNumerico = /^\d+$/;
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Exercise10() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  let [dados, setDados] = useState([]);
  const [id, setId] = useState('');

  useEffect(() => {
    async function obterDados() {
      let retorno = await getDados();
      setDados(retorno);
      console.log(dados);
      console.log(dados.length);
    }
    obterDados();
  }, [id]);

  async function onSubmit(dados) {
    let id = await addDado(dados);

    if(id) {
      alert("Formulário Enviado! - " + JSON.stringify(dados));
      setId(id);
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

      <h3>Dados</h3>

      { dados.length === 0 &&
        <p>Não há dados cadastrados</p>
      }

      { dados &&
        dados.map(dado => (
          <div key={dado.id}>
            <p>Nome: {dado.nome}</p>
            <p>Email: {dado.email}</p>
            <p>Tel: {dado.tel}</p>
          </div>
        ))
      }
    </form>
  );
}
