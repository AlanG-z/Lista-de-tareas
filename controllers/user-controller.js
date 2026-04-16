const usersService = require("../services/users.service");

const getAll = (req, res) => {
  const users = usersService.getAll();
  res.json(users);
};

const getById = (req, res) => {
  const { id } = req.params;
  const user = usersService.getById(id);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json(user);
};

const create = (req, res) => {
  const newUser = usersService.create(req.body);
  res.status(201).json(newUser);
};

const update = (req, res) => {
  const { id } = req.params;
  const updatedUser = usersService.update(id, req.body);

  if (!updatedUser) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json(updatedUser);
};

const remove = (req, res) => {
  const { id } = req.params;
  const deleted = usersService.remove(id);

  if (!deleted) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.json({ message: "Usuario eliminado" });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove
};
