// Crie uma página com o formulário da questão 1, trocando o hook useState por useForm do react-hook-form.

import '../style.css'
import { useForm } from 'react-hook-form';

export default function Exercise4() {
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
          },
        })}
      />

      {errors.tel && <p>{errors.tel.message}</p>}

      <input type="submit" value="Salvar" />
    </form>
  );
}

