module.exports = {
  dialect: "postgres",
  host: "192.168.99.103", // IP given by your docker machine OR your localhost
  username: "postgres",
  password: "docker",
  database: "users_database",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};
