import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './components/Accueil';
import AjouterJoueur from './components/AjouterJoueur';
import ModifierJoueur from './components/ModifierJoueur';
import SupprimerJoueur from './components/SupprimerJoueur';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="" element={<Accueil />} />
        <Route path="/ajouter" element={<AjouterJoueur />} />
        <Route path="/modifier" element={<ModifierJoueur />} />
        <Route path="/supprimer" element={<SupprimerJoueur />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
