/**
 * PlayerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // Action pour récupérer la liste des joueurs
    async find(req, res) {
      try {
        const players = await Player.find();
        return res.json(players);
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Action pour créer un joueur
    async create(req, res) {
      try {
        const newPlayer = await Player.create(req.body).fetch();
        return res.json(newPlayer);
      } catch (err) {
        return res.badRequest(err);
      }
    },
  
    // Action pour mettre à jour un joueur
    async update(req, res) {
      try {
        const updatedPlayer = await Player.updateOne({ id: req.params.id }).set(req.body);
        return res.json(updatedPlayer);
      } catch (err) {
        return res.badRequest(err);
      }
    },
  
    // Action pour supprimer un joueur
    async destroy(req, res) {
      try {
        await Player.destroyOne({ id: req.params.id });
        return res.ok();
      } catch (err) {
        return res.serverError(err);
      }
    }
  };
  

