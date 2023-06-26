import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './List.css';

const Listagem = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        setDados(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Listagem</h1>
      <div className="card-list">
        {dados.map((card) => (
          <Link to={`/detalhes/${card.id}`} key={card.id} className="card-link">
            <div className="card">
              <img src={card.card_images[0].image_url} alt={card.name} className="card-image" />
              <p className="card-name">{card.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Listagem;
