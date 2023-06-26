import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Detail.css';


const Detalhes = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
        setCard(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCard();
  }, [id]);

  if (!card) {
    return <div>Carregando...</div>;
  }

  const { name, type, desc, card_images, atk, def } = card;

  return (
       <div className="container">
      <img src={card_images[0].image_url} alt={name} className="card-image" />
      <div className="card-details">
        <h2 className="card-name">{name}</h2>
        <p className="card-type">{type}</p>
        <p className="card-description">{desc}</p>
        <div className="card-atk-def">
          <p className="card-atk">Ataque: {atk}</p>
          <p className="card-def">Defesa: {def}</p>
        </div>
      </div>
    </div>
  );
};

export default Detalhes;
