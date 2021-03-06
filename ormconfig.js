module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: ["./dist/entities/*.js"],
  migrations: ["./dist/database/migrations/*.js"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
