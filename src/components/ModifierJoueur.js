import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/ModifierJoueur.css';

const UpdatePlayer = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    position: 'Gardien',
    age: 0,
    club: ''
  });
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

    // Récupérer les informations du joueur sélectionné et les mettre dans le formulaire
    const player = players.find(player => player.id === e.target.value);
    setFormData({
      name: player.name,
      position: player.position,
      age: player.age,
      club: player.club
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si un joueur est sélectionné
    if (!selectedPlayer) {
      setMessage('Veuillez sélectionner un joueur.');
      return;
    }

    // Effectuer la requête de mise à jour
    axios.put(`http://localhost:1337/players/${selectedPlayer}`, formData)
      .then(response => {
        console.log('Player updated:', response.data);
        setMessage('Les informations du joueur ont été mises à jour avec succès.');
      })
      .catch(error => {
        console.error('Error updating player:', error);
        setMessage('Une erreur est survenue lors de la mise à jour des informations du joueur.');
      });
  };

  return (
    <div>
      <h2>Modifier un Joueur</h2>
      <div className="update-form">
        <label className="form-label">
          Sélectionner un joueur :
          <select className="form-select" value={selectedPlayer} onChange={handleSelectChange}>
            <option value="">-- Sélectionner --</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>{player.name}</option>
            ))}
          </select>
        </label>
        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Nom :
            <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label className="form-label">
            Position :
            <select className="form-select" name="position" value={formData.position} onChange={handleChange}>
              <option value="Gardien">Gardien</option>
              <option value="Défenseur">Défenseur</option>
              <option value="Milieu">Milieu</option>
              <option value="Attaquant">Attaquant</option>
            </select>
          </label>
          <label className="form-label">
            Âge :
            <input className="form-input" type="number" name="age" value={formData.age} onChange={handleChange} />
          </label>
          <label className="form-label">
            Club :
            <input className="form-input" type="text" name="club" value={formData.club} onChange={handleChange} />
          </label>
          <button className="form-button" type="submit">Modifier Joueur</button>
        </form>
      </div>
      {message && (
        <p className="message">{message}</p>
      )}
    </div>
  );
};

export default UpdatePlayer;
