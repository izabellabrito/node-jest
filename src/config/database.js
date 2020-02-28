require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

module.exports = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || 'postgres',
  // se for usar o sqlite, usar o caminho abaixo
  storage: './__tests__/database.sqlite',
  operatorsAliases: false,
  logging: false,
  define: {
    // created at e update at automaticamente criados
    timestamp: true,
    // nome da tabela seja criado com _ e não u cannelcase
    underscored: true,
    // que a regra de cima seja aplicada para tudo, até nome da tabela
    underscoredAll: true
  }
};
