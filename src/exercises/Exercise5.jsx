// Crie uma página com o formulário da questão anterior, validando com regex o campo telefone permitindo somente números.

import '../style.css'
import { useForm } from 'react-hook-form';

const regexNumerico = /^\d+$/;

export default function Exercise5() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit() {
    alert("Formulário Enviado!");
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
