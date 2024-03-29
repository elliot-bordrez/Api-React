import React, { useState } from 'react';
import axios from 'axios';
import '../assets/styles/AjouterJoueur.css';

const PlayerForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      position: 'Gardien', 
      age: 0,
      club: ''
    });
    const [message, setMessage] = useState(null);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:1337/players', formData)
        .then(response => {
          console.log('Player created:', response.data);
          
          setMessage('Joueur ajouté avec succès !');
         
          setFormData({
            name: '',
            position: 'Gardien',
            age: 0,
            club: ''
          });
        })
        .catch(error => {
          console.error('Error creating player:', error);
          
          setMessage('Une erreur est survenue lors de l\'ajout du joueur.');
        });
    };
  
    return (
      <div>
        <form className="player-form" onSubmit={handleSubmit}>
          <label className="form-label">
            Name:
            <input className="form-input" type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label className="form-label">
            Position:
            <select className="form-select" name="position" value={formData.position} onChange={handleChange}>
              <option value="Gardien">Gardien</option>
              <option value="Défenseur">Défenseur</option>
              <option value="Milieu">Milieu</option>
              <option value="Attaquant">Attaquant</option>
            </select>
          </label>
          <label className="form-label">
            Age:
            <input className="form-input" type="number" name="age" value={formData.age} onChange={handleChange} />
          </label>
          <label className="form-label">
            Club:
            <input className="form-input" type="text" name="club" value={formData.club} onChange={handleChange} />
          </label>
          <button className="form-button" type="submit">Create Player</button>
        </form>
        {message && (
        <p className="message">{message}</p>
      )}
      </div>
    );
  };
  
  export default PlayerForm;