// Crie uma página com o formulário da questão anterior com uma função que mostre os dados do formulário como um JSON após o submit.

import '../style.css'
import { useForm } from 'react-hook-form';

const regexNumerico = /^\d+$/;

export default function Exercise6() {
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
        placeholder='Telefone' size={8}
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
