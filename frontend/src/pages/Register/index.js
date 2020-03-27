import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi' //Pacote de icones
import './styles.css';

import api from '../../services/api'; //Conexão com o serviço HTTP
import logoImg from '../../assets/logo.svg'; //Logo

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhats] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');

  const history = useHistory();
  
  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name, 
      email, 
      whatsapp, 
      city, 
      uf
    };

    try{
      const response =  await api.post('ongs', data);

      alert(`Seu ID de acesso: ${response.data.id}`) //Utiliza crase no lugar das aspas pra usar variavel
      history.push('/')
    }
    catch (err){
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={ logoImg } alt="Be The Hero"/>

          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>

          <Link className="back-link" to="/">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para o logon
          </Link>
        </section>

        <form onSubmit ={handleRegister}>
          <input 
            placeholder="Nome da ONG" 
            value={name}
            onChange={e => setName(e.target.value)}
          /> {/* e.target.value = valor do input*/}
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            placeholder="Whatsapp" 
            value={whatsapp}
            onChange={e => setWhats(e.target.value)}
          />

          <div className="input-group">
            <input 
              placeholder="Cidade" 
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            {/*Pode ser usado o width ou o style, propriedade do react 
            onde a primeira { significa que é um código javascrip dentro do HTML
            e a segunda { um objeto do javascript, neste caso um CSS */}
            <input placeholder="UF" style={{ width: 80}} 
              value={uf}
              onChange={e => setUF(e.target.value)}/> 
          </div>
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  ) 
}