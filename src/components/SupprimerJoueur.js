import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/SupprimerJoueur.css';

const DeletePlayer = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fonction pour récupérer la liste des joueurs
    const fetchPlayers = async () => {
      try {
        const response = await axios.get('http://localhost:1337/players');
        setPlayers(response.data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    };

    // Appel de la fonction pour récupérer les joueurs lorsque le composant est monté
    fetchPlayers();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedPlayer(e.target.value);
  };

  const handleDelete = () => {
    // Vérifier si un joueur est sélectionné
    if (!selectedPlayer) {
      setMessage('Veuillez sélectionner un joueur.');
      return;
    }

    // Demander confirmation avant de supprimer le joueur
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?')) {
      // Effectuer la requête de suppression
      axios.delete(`http://localhost:1337/players/${selectedPlayer}`)
        .then(response => {
          console.log('Player deleted:', response.data);
          setMessage('Le joueur a été supprimé avec succès.');
          // Actualiser la liste des joueurs après la suppression
          setPlayers(players.filter(player => player.id !== selectedPlayer));
          setSelectedPlayer(''); 
        })
        .catch(error => {
          console.error('Error deleting player:', error);
          setMessage('Une erreur est survenue lors de la suppression du joueur.');
        });
    }
  };

  return (
    <div>
      <h2>Supprimer un Joueur</h2>
      <div className="delete-form">
        <label className="form-label">
          Sélectionner un joueur :
          <select className="form-select" value={selectedPlayer} onChange={handleSelectChange}>
            <option value="">-- Sélectionner --</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
        </label>
        <button className="form-button" onClick={handleDelete}>Supprimer Joueur</button>
      </div>
      {message && (
        <p className="message">{message}</p>
      )}
    </div>
  );
};

export default DeletePlayer;
