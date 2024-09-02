// Crie uma página com o exercício anterior que permita excluir um registro da lista e do Firestore = EXCLUIR.

import React, { useEffect, useState } from 'react'
import '../style.css'
import { useForm } from 'react-hook-form';
import { addDado, excluirDados, getDado, getDados } from '../infra/crud';
import DataTable from 'react-data-table-component';

const regexNumerico = /^\d+$/;
const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Exercise13() {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  let [dados, setDados] = useState([]);
  const [id, setId] = useState('');
  const [idEmEdicao, setIdEmEdicao] = useState('');

  useEffect(() => {
    async function obterDados() {
      let retorno = await getDados();
      setDados(retorno);
      console.log(dados);
      console.log(dados.length);

      if(idEmEdicao) {
        const dado = await getDado(idEmEdicao);
        setValue("nome", dado.nome);
        setValue("email", dado.email);
        setValue("tel", dado.tel);
        console.log(dado)
      }
    }
    obterDados();
  }, [id, idEmEdicao]);

  async function onSubmit(dados) {
    let id = await addDado(dados);
    if (id) {
      alert("Formulário Enviado! - " + JSON.stringify(dados));
      setId(id);
    } else {
      alert("Erro ao enviar formulário!");
    }
  }

  const colunas = [
    {
      name: 'Nome',
      selector: row => row.nome,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    {
      name: 'Tel',
      selector: row => row.tel,
    },
  ]

  const opcoes = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de' };

  function handleChange({ selectedRows }) {
    const id = selectedRows[0]?.id;
    setIdEmEdicao(id);
  }

  async function handleExcluir() {
    await excluirDados(idEmEdicao);
    setIdEmEdicao('');
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
      <input type="button" onClick={handleExcluir} value="Excluir" />

      <h3>Dados</h3>

      <DataTable
        columns={colunas}
        data={dados}
        selectableRows
        selectableRowsHighlight
        selectableRowsSingle
        onSelectedRowsChange={handleChange}
        pagination
        paginationComponentOptions={opcoes}
        noDataComponent="Cadastro Vazio"
      />
    </form>
  );
}
