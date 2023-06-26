import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h1>Detalhes da Carta</h1>
      <img src={card_images[0].image_url} alt={name} />
      <h2>{name}</h2>
      <p>{desc}</p>
      <p>Tipo: {type}</p>
      <p>Ataque: {atk !== undefined ? atk : 'N/A'}</p>
      <p>Defesa: {def !== undefined ? def : 'N/A'}</p>
    </div>
  );
};

export default Detalhes;
