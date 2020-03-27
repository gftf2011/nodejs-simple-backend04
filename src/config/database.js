module.exports = {
  dialect: 'postgres',
  host: '127.0.0.1', // IP given by your docker machine OR your localhost
  username: 'postgres',
  password: 'docker',
  database: 'users_database',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
