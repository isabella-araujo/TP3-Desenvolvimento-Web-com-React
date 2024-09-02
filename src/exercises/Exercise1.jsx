// Crie uma página com um formulário simples, usando o hook useState, que obtenha nome e telefone.
import React, { useContext, useReducer, useState } from 'react'
import '../style.css'

export default function Exercise1() {
  const [user, setUser] = useState({
    nome: '',
    tel: undefined
  });

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUser((user) => {
      return {
        ...user,
        [name]: value
      }
    });
  }

  return (
    <div className='container-form'>
      <h3>Formulário</h3>
      <input
        value={user.nome}
        type="text"
        name='nome'
        placeholder="Nome"
        onChange={handleChange}
      />

      <input
        value={user.tel}
        type="number"
        name='tel'
        placeholder="Telefone"
        onChange={handleChange}
      />
      
      <input type="button" value="Enviar" onClick={(e) => alert("Formulário Enviado!")} />
    </div>
  );
}
