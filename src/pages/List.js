import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './List.css';

const Listagem = () => {
  const [dados, setDados] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(40);

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

  // Paginação
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = dados.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(dados.length / cardsPerPage);

  // Funções para a paginação
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1>Listagem</h1>
      <div className="card-list">
        {currentCards.map((card) => (
          <Link to={`/detalhes/${card.id}`} key={card.id} className="card-link">
            <div className="card">
              <img src={card.card_images[0].image_url} alt={card.name} className="card-image" />
              <p className="card-name">{card.name}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Paginação */}
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default Listagem;
