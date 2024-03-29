import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/Accueil.css';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);
  
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
  
    return (
      <div>
        {}
        <nav className="navbar">
          <ul>
            <li><a href="/" className="nav-button">Accueil</a></li>
            <li><a href="/ajouter" className="nav-button">Ajouter Joueur</a></li>
            <li><a href="/modifier" className="nav-button">Modifier Joueur</a></li>
            <li><a href="/supprimer" className="nav-button">Supprimer Joueur</a></li>
          </ul>
        </nav>
  
        {}
        <div className="player-list-container">
          <h2>Liste des Joueurs</h2>
          <table className="player-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Position</th>
                <th>Âge</th>
                <th>Club</th>
              </tr>
            </thead>
            <tbody>
              {players.map(player => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>{player.position}</td>
                  <td>{player.age} ans</td>
                  <td>{player.club}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default PlayerList;
