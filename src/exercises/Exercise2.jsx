// Crie uma página com o formulário da questão anterior, validando o campo nome e telefone como sendo obrigatórios.
import '../style.css'
import React, { useReducer, useState } from 'react'

export default function Exercise2() {
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [user, setUser] = useState({
    nome: '',
    tel: undefined
  });
  const [erros, updateErros] = useReducer(reducer, { nome: '', tel: '' });

  function reducer(state, action) {
    switch (action.type) {
      case 'validar-nome': {
        if (user.nome === '' || user.nome.length < 3) {
          setBtnDisabled(true);
          return { ...state, nome: "Nome inválido" }
        } else {
          setBtnDisabled(false);
          return { ...state, nome: '' }
        }
      }
      case 'validar-tel': {
        if (user.tel.length < 9) {
          setBtnDisabled(true);
          return { ...state, tel: "Telefone inválido" }
        } else {
          setBtnDisabled(false);
          return { ...state, tel: '' }
        }
      }
      default:
        return state;
    }
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setUser((user) => {
      return {
        ...user,
        [name]: value
      }
    });

    updateErros({ type: `validar-${name}` }, value);
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

      {erros.nome && <p>{erros.nome}</p>}

      <input
        value={user.tel}
        type="number"
        name='tel'
        placeholder="Telefone"
        onChange={handleChange}
      />

      {erros.tel && <p>{erros.tel}</p>}

      {btnDisabled ? <input disabled type="button" value="Enviar" /> : <input type="button" value="Enviar" onClick={(e) => alert("Formulário Enviado!")} />}
    </div>
  )
}
