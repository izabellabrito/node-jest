const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      // virtual: só aparece na model e não no banco de dados
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING
    },
    {
      hooks: {
        // antes de salvar o usuario
        beforeSave: async user => {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 8);
          }
        }
      }
    }
  );

  // define um novo metodo para o user.js, não usamos
  // arrow function pq preciso do this
  User.prototype.checkPassword = function(password) {
    debugger;
    return bcrypt.compare(password, this.password_hash);
  };

  User.prototype.generateToken = function() {
    // cripto o id do usuário
    return jwt.sign({ id: this.id }, process.env.APP_SECRET);
  };

  return User;
};
