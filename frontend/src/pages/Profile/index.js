import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi' //Pacote de icones
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg'; //Logo

export default function Profile() {
  const history = useHistory();

  const [incidents, setIncidents] = useState([]);
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  useEffect(()=> {
    api.get('profile', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  },[ongId]);
//Ação de deletar
  async function handleDeleteIncident(id){
    try
    {
        await api.delete(`incidents/${id}`,{
          headers: 
          {
            Authorization: ongId,
          }
        });

        setIncidents(incidents.filter(incident => incident.id !== id));
    }
    catch(err)
    {
      alert('Falha ao deletar o caso');
    }
  }
//Ação de logout
  function handleLogout()
  {
    localStorage.clear(); //Limpa os dados do usuário / cache
    history.push('/'); //Envia de volta para rota raiz
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/> 
        <span>Bem vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => (
          <li key={incident.key}>
          <strong>CASO:</strong>
          <p>{incident.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{incident.description}</p>

          <strong>Valor:</strong>
          <p>
            {Intl.NumberFormat('pt-BT', {style: 'currency', currency: 'BRL'})
            .format(incident.value)
          }</p>

          {/*Não faz sentido, mas deixando dessa forma, ao carregar a pagina, ele apaga
          todos os casos automaticamente */}
          {/*<button onClick={handleDeleteIncident(incident.id)} type="button">*/}
          {/*Fazendo desta forma, cria-se uma arrowFunction. Desta maneira será passado
          para o onClick uma função e não o retorno da função
          Confesso que ainda não entendi direito*/}
          <button onClick={() => handleDeleteIncident(incident.id)} type="button">
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>
        ))}
      </ul>
    </div>
  )
}