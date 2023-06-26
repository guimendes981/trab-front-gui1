import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Detalhes = ({ match }) => {
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${match.params.id}`);
        setCard(response.data.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCard();
  }, [match.params.id]);

  if (!card) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Detalhes</h1>
      <img src={card.card_images[0].image_url} alt={card.name} />
      <h2>{card.name}</h2>
      <p>{card.type}</p>
      <p>Ataque: {card.atk}</p>
      <p>Defesa: {card.def}</p>
      {/* Exiba mais informações sobre a carta, conforme necessário */}
      <Link to="/">Voltar para a listagem</Link>
      <Link to="/formulario">Ir para o formulário</Link>
    </div>
  );
};

export default Detalhes;
