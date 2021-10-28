import 'reflect-metadata';
import express from 'express';
import { PostgresConnector } from './database/connect';
import { routes } from './routes';
require('dotenv-safe').config({
  allowEmptyValues: true
});

const app = express();

const connector: PostgresConnector = new PostgresConnector();

connector.connect().then(() => {
  console.log(`[+] 🌀 PostgreSQL Connected...`)
}).catch((error) => {
  console.log(`🛑 Error: ${error}`)
})

app.use(express.json());

app.use(routes);

export { app }