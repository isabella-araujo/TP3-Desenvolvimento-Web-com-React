// Crie uma página com um campo onde será possível digitar um CEP e obter o endereço completo - valide o campo. Use o serviço https://viacep.com.br/

import React, { useState } from 'react'
import '../style.css'
import obterEnderecoPorCep from '../infra/viacep';

export default function Exercise16() {
  const [endereco, setEndereco] = useState({});
  async function handleClick() {
    const cep = document.getElementById("cep").value;
    if(cep.length === 8 || cep.length === 9) {
      setEndereco(await obterEnderecoPorCep(cep));
    } else {
      alert("CEP inválido.");
    }
  }

  return (
    <div className='container-form'>
      <input id="cep" type="text" placeholder="CEP" />
      <button onClick={handleClick}>Buscar</button>
      { endereco?.cep &&
        <div className='container-form'>
          <h3>Endereço</h3>
          <p>CEP: {endereco?.cep}</p>
          <p>Logradouro: {endereco?.logradouro}</p>
          <p>UF: {endereco?.uf}</p>
          <p>Bairro: {endereco?.bairro}</p>
          <p>Estado: {endereco?.estado}</p>
          <p>Região: {endereco?.regiao}</p>
          <p>ddd: {endereco?.ddd}</p>
          <p>Complemento: {endereco?.complemento}</p>
        </div>
      }
    </div>
  )
}
